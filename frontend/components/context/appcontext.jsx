'use client'

import { createContext, useContext, useState } from "react"

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [humanVerified, setHumanVerified] = useState(false)
  const [hasAccount, setHasAccount] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)

  return (
    <AppContext.Provider value={{
      humanVerified,
      setHumanVerified,
      hasAccount,
      setHasAccount,
      walletAddress,
      setWalletAddress
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
