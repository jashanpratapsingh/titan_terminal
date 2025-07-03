import React, { useEffect, useState } from 'react';
import TitanLogo from '../icons/TitanLogo';
import JupButton from './JupButton';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletPassThrough } from 'src/contexts/WalletPassthroughProvider';
import { shortenAddress } from '../misc/utils';

interface TitanSwapProps {
  initialInputMint?: string;
  initialOutputMint?: string;
}

const TOKEN_MAP: { [key: string]: any } = {
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': {
    symbol: 'USDC',
    name: 'USD Coin',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    decimals: 6
  },
  'So11111111111111111111111111111111111111112': {
    symbol: 'SOL',
    name: 'Solana',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    decimals: 9
  }
};

const FALLBACK_TOKEN = {
  symbol: 'UNKNOWN',
  name: 'Unknown Token',
  logoURI: 'https://via.placeholder.com/32x32?text=?',
  decimals: 9
};

const TitanSwap: React.FC<TitanSwapProps> = ({ initialInputMint, initialOutputMint }) => {
  const [titanAvailable, setTitanAvailable] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('[TitanSwap] Component mounted');
    console.log('[TitanSwap] Props:', { initialInputMint, initialOutputMint });
    console.log('[TitanSwap] Window object available:', typeof window !== 'undefined');
    if (typeof window !== 'undefined') {
      console.log('[TitanSwap] Window.Titan available:', !!window.Titan);
      console.log('[TitanSwap] Window.Titan.init available:', !!(window.Titan && typeof window.Titan.init === 'function'));
      setTitanAvailable(!!(window.Titan && typeof window.Titan.init === 'function'));
    }
  }, [initialInputMint, initialOutputMint]);

  // Check for Titan availability periodically
  useEffect(() => {
    const checkTitan = () => {
      if (typeof window !== 'undefined' && window.Titan && typeof window.Titan.init === 'function') {
        console.log('[TitanSwap] Titan became available');
        setTitanAvailable(true);
      }
    };

    // Check immediately
    checkTitan();

    // Check periodically
    const interval = setInterval(checkTitan, 1000);
    return () => clearInterval(interval);
  }, []);

  const inputToken = TOKEN_MAP[initialInputMint || ''] || FALLBACK_TOKEN;
  const outputToken = TOKEN_MAP[initialOutputMint || ''] || FALLBACK_TOKEN;

  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');

  // Use global wallet context
  const { publicKey, connecting } = useWalletPassThrough();

  return (
    <div className="bg-black rounded-2xl p-6 min-w-[360px] max-w-[480px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TitanLogo width={24} height={24} />
          <span className="text-white font-semibold text-lg">Titan Swap</span>
        </div>
        <button className="text-gray-400 hover:text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Input Token */}
      <div className="bg-gray-900 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">From</span>
          <span className="text-gray-400 text-sm">Balance: 0.00</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <img src={inputToken.logoURI} alt={inputToken.symbol} className="w-8 h-8 rounded-full" />
            <span className="text-white font-medium">{inputToken.symbol}</span>
          </div>
          <input
            type="text"
            placeholder="0.00"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            className="flex-1 bg-transparent text-white text-right text-lg font-medium outline-none"
          />
        </div>
      </div>

      {/* Swap Arrow */}
      <div className="flex justify-center mb-4">
        <button className="bg-gray-800 rounded-full p-2 hover:bg-gray-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </button>
      </div>

      {/* Output Token */}
      <div className="bg-gray-900 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">To</span>
          <span className="text-gray-400 text-sm">Balance: 0.00</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <img src={outputToken.logoURI} alt={outputToken.symbol} className="w-8 h-8 rounded-full" />
            <span className="text-white font-medium">{outputToken.symbol}</span>
          </div>
          <input
            type="text"
            placeholder="0.00"
            value={outputAmount}
            onChange={(e) => setOutputAmount(e.target.value)}
            className="flex-1 bg-transparent text-white text-right text-lg font-medium outline-none"
          />
        </div>
      </div>

      {/* Wallet Connection */}
      {!publicKey ? (
        <div className="mb-4">
          <WalletMultiButton className="w-full bg-titan-orange hover:bg-titan-yellow text-white font-bold py-3 px-4 rounded-xl" />
        </div>
      ) : (
        <div className="mb-4">
          <div className="bg-gray-800 rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Connected Wallet</span>
              <span className="text-white text-sm">{shortenAddress(publicKey.toString())}</span>
            </div>
          </div>
        </div>
      )}

      {/* Swap Button */}
      <JupButton
        size="lg"
        className="w-full bg-titan-orange hover:bg-titan-yellow text-white font-bold py-3 px-4 rounded-xl"
        disabled={!publicKey || connecting}
      >
        {connecting ? 'Connecting...' : !publicKey ? 'Connect Wallet' : 'Swap'}
      </JupButton>

      {/* Swap Info */}
      {publicKey && (
        <div className="mt-4 space-y-2 text-sm text-gray-400">
          <div className="flex justify-between">
            <span>Rate</span>
            <span>1 {inputToken.symbol} = 0.00 {outputToken.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span>Price Impact</span>
            <span className="text-green-400">0.00%</span>
          </div>
          <div className="flex justify-between">
            <span>Network Fee</span>
            <span>~$0.00</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TitanSwap; 