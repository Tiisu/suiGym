import { useState } from 'react'
import { useConnectWallet, useWallets } from '@mysten/dapp-kit'

interface WalletSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function WalletSelector({ isOpen, onClose, onSuccess }: WalletSelectorProps) {
  const { mutate: connectWallet } = useConnectWallet()
  const wallets = useWallets()
  const [connecting, setConnecting] = useState<string | null>(null)

  const handleWalletConnect = (wallet: any) => {
    setConnecting(wallet.name)
    
    connectWallet(
      { wallet },
      {
        onSuccess: () => {
          console.log(`Connected to ${wallet.name} successfully`)
          setConnecting(null)
          onSuccess()
          onClose()
        },
        onError: (error) => {
          console.error(`Failed to connect to ${wallet.name}:`, error)
          setConnecting(null)
          alert(`Failed to connect to ${wallet.name}. Please make sure your wallet is unlocked and set to Sui Testnet.`)
        }
      }
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Choose a wallet to connect to SuiGym
        </p>

        <div className="space-y-3">
          {wallets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No Sui wallets detected</p>
              <p className="text-sm text-gray-400">
                Please install a Sui-compatible wallet like:
              </p>
              <ul className="text-sm text-gray-400 mt-2">
                <li>• Sui Wallet</li>
                <li>• Yoroi</li>
                <li>• Ethos Wallet</li>
                <li>• Suiet</li>
              </ul>
            </div>
          ) : (
            wallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleWalletConnect(wallet)}
                disabled={connecting === wallet.name}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-3">
                  {wallet.icon && (
                    <img 
                      src={wallet.icon} 
                      alt={wallet.name}
                      className="w-8 h-8 rounded"
                    />
                  )}
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{wallet.name}</p>
                    {wallet.version && (
                      <p className="text-sm text-gray-500">v{wallet.version}</p>
                    )}
                  </div>
                </div>
                
                {connecting === wallet.name ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-blue-600">Connecting...</span>
                  </div>
                ) : (
                  <span className="text-blue-600 text-sm font-medium">Connect</span>
                )}
              </button>
            ))
          )}
        </div>

        {wallets.length > 0 && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Make sure your wallet is unlocked and set to <strong>Sui Testnet</strong> before connecting.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}