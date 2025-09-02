import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui.js/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { APP_CONFIG } from '../../../shared/config'

// Network configuration
const { networkConfig } = createNetworkConfig({
  devnet: { url: getFullnodeUrl('devnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
})

// Create a query client
const queryClient = new QueryClient()

interface SuiProviderProps {
  children: ReactNode
}

export function SuiProvider({ children }: SuiProviderProps) {
  const currentNetwork = APP_CONFIG.CURRENT_NETWORK.toLowerCase() as 'devnet' | 'testnet' | 'mainnet'
  
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={currentNetwork}>
        <WalletProvider autoConnect>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}