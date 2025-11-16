/*
/// Module: contracts
module contracts::contracts;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

module contracts::social_media {

    use sui::tx_context::sender;
    use sui::table::{Table, new as table_new, contains, add};
    use sui::transfer::{share_object, public_transfer};
    use sui::object::{new as object_new, id as object_id};
    use sui::ed25519::ed25519_verify;
    use sui::bcs;

    /****************************************************
    * GLOBAL REGISTRY
    *****************************************************/
    public struct Registry has key, store {
        id: UID,
        backend_pubkey: vector<u8>, 
        users: Table<address, ID>,
        humans: Table<vector<u8>, ID>,
        posts: Table<ID, bool>,
    }

    /****************************************************
    * USER OBJECT
    *****************************************************/
    public struct User has key, store {
        id: UID,
        wallet: address,
        nullifier: vector<u8>,
        posts: Table<ID, bool>,
        liked_posts: Table<ID, bool>,
        disliked_posts: Table<ID, bool>,
        reviewed_posts: Table<ID, bool>,
    }

    /****************************************************
    * INIT FUNCTION
    *****************************************************/
    // internal init function, creates and shares the registry
    fun init(ctx: &mut TxContext) {
        let registry = Registry {
            id: object_new(ctx),
            backend_pubkey: vector::empty<u8>(),
            users: table_new<address, ID>(ctx),
            humans: table_new<vector<u8>, ID>(ctx),
            posts: table_new<ID, bool>(ctx),
        };

        share_object(registry);
    }

    public entry fun set_backend_pubkey(
        registry: &mut Registry,
        new_key: vector<u8>,
        ctx: &mut TxContext
    ) {
        let sender_addr = sender(ctx);

        // Only the module publisher can call this
        assert!(sender_addr == @contracts, 9001);

        registry.backend_pubkey = new_key;
    }

    fun clone_u8_vector(v: &vector<u8>): vector<u8> {
        let mut new_v = vector::empty<u8>();
        let len = vector::length(v);
        let mut i = 0;
        while (i < len) {
            // u8 is a copy type, so we can dereference and push a copy.
            vector::push_back(&mut new_v, *vector::borrow(v, i));
            i = i + 1;
        };
        new_v
    }

    /****************************************************
    * CREATE USER  (World ID)
    *****************************************************/
    public entry fun create_user(
        registry: &mut Registry,
        nullifier: vector<u8>,
        signature: vector<u8>,
        ctx: &mut TxContext
    ) {
        let wallet = sender(ctx);

        // Prevent duplicate wallet
        if (contains(&registry.users, wallet)) { abort 1001; };

        // Prevent duplicate human
        if (contains(&registry.humans, nullifier)) { abort 1002; };

        let nullifier_for_msg = clone_u8_vector(&nullifier); 

        // BUILD EXPECTED MESSAGE 

        let mut msg_bytes = vector::empty<u8>();
        vector::append(&mut msg_bytes, bcs::to_bytes(&wallet));
        vector::append(&mut msg_bytes, nullifier_for_msg);

        // VERIFY BACKEND SIGNATURE

        let ok = ed25519_verify(&signature, &registry.backend_pubkey, &msg_bytes);
        if (!ok) { abort 2001; }; // invalid signature

        let user: User = User {
            id: object_new(ctx),
            wallet,
            nullifier,
            posts: table_new<ID, bool>(ctx),
            liked_posts: table_new<ID, bool>(ctx),
            disliked_posts: table_new<ID, bool>(ctx),
            reviewed_posts: table_new<ID, bool>(ctx),
        };

        let user_id: ID = object_id(&user);

        add(&mut registry.users, wallet, user_id);
        add(&mut registry.humans, nullifier, user_id);

        // Transfer the user object to the wallet owner
        public_transfer(user, wallet);
    }
}
