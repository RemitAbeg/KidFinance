"use client"

import { useWallet } from "@/hooks/use-wallet"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

/**
 * Example component showing wallet information
 * You can use this as a reference for integrating wallet data in your app
 */
export function WalletInfo() {
  const { 
    address, 
    isConnected, 
    isConnecting, 
    chain, 
    balance,
    openModal,
    disconnect 
  } = useWallet()

  if (isConnecting) {
    return (
      <Card className="p-4">
        <p>Connecting wallet...</p>
      </Card>
    )
  }

  if (!isConnected) {
    return (
      <Card className="p-4">
        <p className="mb-4">Connect your wallet to get started</p>
        <Button onClick={() => openModal()}>Connect Wallet</Button>
      </Card>
    )
  }

  return (
    <Card className="p-4 space-y-2">
      <h3 className="font-bold">Wallet Connected</h3>
      <p className="text-sm">
        <span className="font-medium">Address:</span>{" "}
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </p>
      {chain && (
        <p className="text-sm">
          <span className="font-medium">Network:</span> {chain.name}
        </p>
      )}
      {balance && (
        <p className="text-sm">
          <span className="font-medium">Balance:</span>{" "}
          {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
        </p>
      )}
      <Button variant="outline" size="sm" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </Card>
  )
}

