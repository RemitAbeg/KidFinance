# Reown AppKit Integration Guide

This document explains the Reown AppKit (wallet connection) integration in the KidFi frontend.

## 🎯 What's Been Set Up

### 1. Configuration (`config/index.tsx`)
- Wagmi adapter configuration with Celo networks
- Cookie-based storage for SSR support
- Networks configured: Celo Mainnet and Celo Alfajores (testnet)

### 2. Context Provider (`context/index.tsx`)
- React Query client setup
- Wagmi provider with SSR support
- AppKit modal creation with KidFi metadata
- Analytics enabled by default

### 3. Root Layout (`app/layout.tsx`)
- Context provider wrapper for the entire app
- Cookie handling for SSR hydration
- Prevents hydration mismatch errors

### 4. Next.js Configuration (`next.config.mjs`)
- Webpack externals for compatibility
- Required for AppKit to work with Next.js SSR

## 🚀 Using the Wallet Connection

### Quick Start - Web Component

The simplest way to add a connect button anywhere in your app:

```tsx
export function MyComponent() {
  return (
    <div>
      <appkit-button />
    </div>
  )
}
```

### Using the Custom Components

We've created reusable components:

```tsx
import { ConnectWalletButton } from '@/components/connect-wallet-button'

export function MyPage() {
  return (
    <div>
      <ConnectWalletButton />
    </div>
  )
}
```

### Using the Custom Hook

For advanced wallet interactions:

```tsx
"use client"

import { useWallet } from '@/hooks/use-wallet'

export function MyComponent() {
  const { 
    address, 
    isConnected, 
    chain, 
    balance,
    openModal,
    disconnect 
  } = useWallet()

  if (!isConnected) {
    return <button onClick={() => openModal()}>Connect Wallet</button>
  }

  return (
    <div>
      <p>Connected: {address}</p>
      <p>Network: {chain?.name}</p>
      <p>Balance: {balance?.formatted} {balance?.symbol}</p>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}
```

## 📦 Components & Hooks Reference

### Components
- `ConnectWalletButton` - Basic wallet connection button
- `CustomConnectWalletButton` - Button with balance display
- `WalletInfo` - Full wallet information card (example component)

### Hooks
- `useWallet()` - Custom hook with all wallet functionality
- `useAccount()` - Wagmi hook for account info
- `useBalance()` - Wagmi hook for balance
- `useConnect()` - Wagmi hook for connection
- `useDisconnect()` - Wagmi hook for disconnection

## 🔧 Environment Variables

Make sure you have the following in your `.env.local`:

```env
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
```

Get your project ID from: https://dashboard.reown.com

## 🌐 Networks

Currently configured networks:
- **Celo Mainnet** (default)
- **Celo Alfajores** (testnet)

To add more networks, update `config/index.tsx`:

```tsx
import { celo, celoAlfajores, polygon, mainnet } from '@reown/appkit/networks'

export const networks = [celo, celoAlfajores, polygon, mainnet]
```

## 🎨 Customization

### Modal Appearance

Modify the AppKit modal in `context/index.tsx`:

```tsx
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [celo, celoAlfajores],
  defaultNetwork: celo,
  metadata: {
    name: 'Your App Name',
    description: 'Your Description',
    url: 'https://yourapp.com',
    icons: ['https://yourapp.com/icon.png']
  },
  features: {
    analytics: true,
    email: false,
    socials: ['google', 'x', 'discord']
  }
})
```

### Button Appearance

Web component attributes:

```tsx
<appkit-button 
  balance="show"     // show or hide balance
  size="md"          // md or sm
  label="Connect"    // custom label
/>
```

## 🔐 Smart Contract Integration

Use Wagmi hooks for contract interactions:

```tsx
import { useReadContract, useWriteContract } from 'wagmi'

// Read from contract
const { data } = useReadContract({
  address: '0x...',
  abi: contractABI,
  functionName: 'balanceOf',
  args: [address]
})

// Write to contract
const { writeContract } = useWriteContract()

writeContract({
  address: '0x...',
  abi: contractABI,
  functionName: 'transfer',
  args: [toAddress, amount]
})
```

## 🐛 Troubleshooting

### Hydration Mismatch Errors
- Make sure `ssr: true` is set in `config/index.tsx`
- Ensure cookies are being passed correctly in `layout.tsx`

### Module Not Found Errors
- Verify webpack externals are in `next.config.mjs`
- Try restarting the dev server

### Project ID Error
- Check that `NEXT_PUBLIC_PROJECT_ID` is set in `.env.local`
- Verify the ID is valid on Reown Dashboard

## 📚 Additional Resources

- [Reown AppKit Docs](https://docs.reown.com/appkit/overview)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)
- [Reown Dashboard](https://dashboard.reown.com)

## ✅ Current Implementation

The connect wallet button has been added to:
- ✅ Landing page navbar (`app/page.tsx`)

You can now add it to other pages like:
- Parent dashboard
- Child dashboard
- Any other pages that need wallet connection

