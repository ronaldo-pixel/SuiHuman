"use client";

import { useState, useEffect } from "react";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { useWalletKit, ConnectButton } from "@mysten/wallet-kit";
import axios from "axios";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SuiClient } from "@mysten/sui.js/client";

const client = new SuiClient({
    url: "https://fullnode.testnet.sui.io",   // or mainnet/fullnode.local
});

export default function Home() {
    const { signAndExecuteTransactionBlock, currentAccount, connected, connect } = useWalletKit();

    const [worldIDResult, setWorldIDResult] = useState(null);
    const [backendSignature, setBackendSignature] = useState(null);
    const [backendPubkey, setBackendPubkey] = useState(null);

    const REGISTRY_ID = "0xYOUR_REGISTRY_ID";




    const onSuccess = () => {
        console.log("Success")
    };
    // =============================
    // WORLD ID HANDLER
    // =============================
    async function handleWorldID(result) {
        if (!connected) {
            alert("Connect wallet first!");
            return;
        }

        const wallet = currentAccount.address;

        const resp = await axios.post("http://localhost:3000/api/worldid", {
            wallet,
            nullifier_hash: result.nullifier_hash,
            proof: result.proof,
            merkle_root: result.merkle_root,
        });

        setWorldIDResult(result);
        setBackendSignature(resp.data.signature);
        setBackendPubkey(resp.data.backend_pubkey);

        alert("Human verified!");
    }

    // =============================
    // CREATE ACCOUNT
    // =============================
    async function createAccount() {
        if (!worldIDResult) {
            alert("Verify Human ID first!");
            return;
        }

        const txb = new TransactionBlock();

        const nullifierBytes = Array.from(
            Buffer.from(worldIDResult.nullifier_hash.replace("0x", ""), "hex")
        );

        txb.moveCall({
            target: `0x2::social_media::create_user`,
            arguments: [
                txb.object(REGISTRY_ID),
                txb.vector("u8", nullifierBytes),
                txb.vector("u8", Array.from(Buffer.from(backendSignature, "hex"))),
                txb.vector("u8", Array.from(Buffer.from(backendPubkey, "hex")))
            ],
        });

        const res = await signAndExecuteTransactionBlock({ transactionBlock: txb });

        console.log(res);
        alert("Account created!");
    }

    return (
        <main style={{ padding: 40 }}>
            <h1>Sui + World ID Registration</h1>

            {/* 1️⃣ SHOW ONLY IF WALLET NOT CONNECTED */}
            {!connected && (
                <ConnectButton
                  connectText={'Connect Wallet'}
                  connectedText={"Connected"}
                />
            )}

            {/* 2️⃣ SHOW ONLY IF WALLET CONNECTED AND USER NOT VERIFIED */}
            
                <IDKitWidget
                    app_id="app_31ff2aab1978e684391a327f46c8be35"
                    action="register"
                    false
                    verification_level={VerificationLevel.Device}
                    handleVerify={handleWorldID}
                    onSuccess={onSuccess}>
                    {({ open }) => (
                        <button onClick={open} style={btnStyle("#111")}>
                            Verify Human ID
                        </button>
                    )}
                </IDKitWidget>
            

            {/* 3️⃣ SHOW ONLY IF USER VERIFIED AND HAS NO ACCOUNT */}
            {connected && worldIDResult && !hasAccount && (
                <button
                    onClick={createAccount}
                    style={btnStyle("#00b894")}
                >
                    Create Account
                </button>
            )}

            {/* 4️⃣ IF ALREADY HAS ACCOUNT */}
            {connected && hasAccount && (
                <p style={{ marginTop: 20, fontSize: 18, color: "green" }}>
                    ✔ You already have an account.
                </p>
            )}
        </main>
    );
}

// Small helper style function
function btnStyle(color) {
    return {
        padding: 16,
        marginBottom: 20,
        display: "block",
        width: 250,
        background: color,
        color: "white",
        borderRadius: 8
    };
}
