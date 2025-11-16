"use client";

import { IDKitWidget } from "@worldcoin/idkit";
import { useWallet } from "@mysten/wallet-kit";
import axios from "axios";
import { TransactionBlock } from "@mysten/sui.js";

export default function Home() {
    const { signAndExecuteTransactionBlock, currentAccount, connected, connect } = useWallet();

    async function handleWorldID(result) {
        // result contains { nullifier_hash, proof, merkle_root }
        console.log("WorldID result:", result);

        if (!connected) await connect();

        const wallet = currentAccount.address;

        // Call BACKEND to verify WorldID + sign
        const resp = await axios.post("http://localhost:3000/api/worldid", {
            wallet,
            nullifier_hash: result.nullifier_hash,
            proof: result.proof,
            merkle_root: result.merkle_root,
        });

        const { signature, backend_pubkey } = resp.data;

        // Create transaction
        const txb = new TransactionBlock();

        const REGISTRY_ID = "0xYOUR_SHARED_REGISTRY_ID";

        txb.moveCall({
            target: `0x2::social_media::create_user`,
            arguments: [
                txb.object(REGISTRY_ID),
                txb.vector("u8", Array.from(Buffer.from(result.nullifier_hash.replace("0x", ""), "hex"))),
                txb.vector("u8", Array.from(Buffer.from(signature, "hex"))),
                txb.vector("u8", Array.from(Buffer.from(backend_pubkey, "hex"))),
            ],
        });

        const res = await signAndExecuteTransactionBlock({
            transactionBlock: txb,
        });

        console.log("Sui result:", res);
        alert("User Created!");
    }

    return (
        <main style={{ padding: 30 }}>
            <h1>Register With World ID</h1>

            <IDKitWidget
                app_id="app_staging_YOUR_APP_ID"
                action="register"
                onSuccess={handleWorldID}
            >
                {({ open }) => (
                    <button onClick={open} style={{ padding: 16, background: "black", color: "white", borderRadius: 8 }}>
                        Verify with World ID
                    </button>
                )}
            </IDKitWidget>
        </main>
    );
}
