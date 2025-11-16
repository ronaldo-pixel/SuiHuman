import express from "express";
import bodyParser from "body-parser";
import * as ed from "@noble/ed25519";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());

// ------------------------------
// BACKEND PRIVATE KEY
// ------------------------------
// 32-byte private key in hex format.
// Generate once and store securely (env variable / vault)
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const PRIVATE_KEY_BYTES = Buffer.from(PRIVATE_KEY, "hex");

// Derive public key. getPublicKeyAsync requires bytes input.
const PUBLIC_KEY_BYTES = await ed.getPublicKeyAsync(PRIVATE_KEY_BYTES);

// Convert the public key bytes back to a hex string for logging and transmission.
const PUBLIC_KEY = Buffer.from(PUBLIC_KEY_BYTES).toString("hex");

console.log("Backend Ed25519 public key:", PUBLIC_KEY);

// ------------------------------
// SIGN WORLD ID PROOF
// ------------------------------
app.post("/verify-worldid", async (req, res) => {
    try {
        const { wallet, nullifier } = req.body;

        if (!wallet || !nullifier) {
            return res.status(400).send({ error: "Missing wallet or nullifier" });
        }

        // Convert nullifier from hex string → bytes
        const nullifierBytes = Buffer.from(nullifier, "hex");

        // Convert wallet (e.g. 0x123...) → raw address bytes
        const walletBytes = Buffer.from(wallet.replace("0x", ""), "hex");

        // Combine wallet + nullifier into message
        const message = Buffer.concat([walletBytes, nullifierBytes]);

        // Sign the message with backend private key
        const signature = await ed.signAsync(message, PRIVATE_KEY);

        return res.send({
            wallet,
            nullifier,
            signature: Buffer.from(signature).toString("hex"),
            backend_pubkey: PUBLIC_KEY,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Internal backend error" });
    }
});

// ------------------------------
app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});
