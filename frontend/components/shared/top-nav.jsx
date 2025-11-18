'use client'

import Link from 'next/link'
import { useApp } from "@/components/context/appcontext"
import { useEffect } from 'react'
import { useWalletKit, ConnectButton } from "@mysten/wallet-kit"
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit"

export function TopNav() {

  const {
    humanVerified,
    setHumanVerified,
    hasAccount,
    setHasAccount,
    walletAddress,
    setWalletAddress
  } = useApp();

  const { isConnected, currentAccount } = useWalletKit();

  useEffect(() => {
    if (isConnected) {
      const address = currentAccount?.address || "";
      setWalletAddress(address);

      console.log("Wallet Connected:");
    } else {
      console.log(isConnected);

      setWalletAddress("");
      setHumanVerified(false);
      setHasAccount(false);
    }
  }, [isConnected, currentAccount]);

  async function handleVerify(result) {
      

      alert("Human verified!");
      setHumanVerified(true);
  }

  const onVerifySuccess = () => {
    console.log("Success")
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 max-w-7xl mx-auto w-full">

        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in-scale"
        >
          SuiHuman
        </Link>

        {/* Center Nav */}
        <div className="flex items-center gap-4 absolute left-1/2 -translate-x-1/2 text-foreground font-medium">
          <Link
            href="/explore"
            className="px-4 py-1.5 rounded-full transition-all hover:bg-primary/10 hover:text-primary"
          >
            Explore
          </Link>

          <Link
            href="/profile"
            className="px-4 py-1.5 rounded-full transition-all hover:bg-primary/10 hover:text-primary"
          >
            Profile
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">

          {/* 1️⃣ Connect Wallet */}
          
            <ConnectButton
              connectText="Connect Wallet"
              connectedText="Connected"
              className="!rounded-full !px-5 !py-2 !font-medium !bg-primary !text-white !hover:bg-primary/80 transition"
            />
          

          {/* 2️⃣ Verify Human (Simple Green) */}
          {isConnected && !humanVerified && !hasAccount && (
            <IDKitWidget
              app_id="app_31ff2aab1978e684391a327f46c8be35"
              action="register"
              false
              verification_level={VerificationLevel.Device}
              handleVerify={handleVerify}
              onSuccess={onVerifySuccess}
            >
              {({ open }) => (
                <button
                  onClick={open}
                  className="
                    px-5 py-2 rounded-full
                    text-white font-medium
                    bg-[#00b894]
                    hover:bg-[#009f7c]
                    transition
                  "
                >
                  Verify Human
                </button>
              )}
            </IDKitWidget>
          )}

          {/* 3️⃣ Create Account (Same simple green) */}
          {isConnected && humanVerified && !hasAccount && (
            <button
              className="
                px-5 py-2 rounded-full
                text-white font-medium
                bg-[#00b894]
                hover:bg-[#009f7c]
                transition
              "
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
