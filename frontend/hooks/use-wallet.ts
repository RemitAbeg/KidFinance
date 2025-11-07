"use client"

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'

/**
 * Custom hook to interact with wallet connection
 * Provides easy access to wallet state and actions
 */
export function useWallet() {
  const { address, isConnected, isConnecting, isDisconnected, chain } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { open, close } = useAppKit()
  
  // Get balance for connected account
  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address: address,
  })

  return {
    // Account info
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    chain,
    
    // Balance
    balance,
    isLoadingBalance,
    
    // Actions
    connect,
    disconnect,
    connectors,
    
    // Modal controls
    openModal: open,
    closeModal: close,
  }
}

