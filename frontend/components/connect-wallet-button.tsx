"use client"

import React from "react"

/**
 * ConnectWalletButton component using Reown AppKit
 * This is a wrapper around the appkit-button web component
 */
export function ConnectWalletButton() {
  return <appkit-button />
}

/**
 * Custom styled wallet button with additional options
 * You can customize the appearance and behavior
 */
export function CustomConnectWalletButton() {
  return (
    <appkit-button 
      balance="show"
      size="md"
    />
  )
}

