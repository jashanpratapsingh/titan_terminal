import React, { useState } from 'react';
import TitanLogo from '../icons/TitanLogo';
import JupButton from './JupButton';

interface TitanSwapProps {
  initialInputMint: string;
  initialOutputMint: string;
}

const TOKEN_MAP: Record<string, { symbol: string; icon: string }> = {
  // USDC (mainnet)
  'EPjFWdd5AufqSSqeM2q8j5pchsM8h5F5u5Y5kG6XkW6': {
    symbol: 'USDC',
    icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2q8j5pchsM8h5F5u5Y5kG6XkW6/logo.png',
  },
  // SOL (wrapped)
  'So11111111111111111111111111111111111111112': {
    symbol: 'SOL',
    icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  },
  // USDT (mainnet)
  'Es9vMFrzaCERa5t9QkKN4Uf9h3YiF1gP7r6zG3k5wC9': {
    symbol: 'USDT',
    icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERa5t9QkKN4Uf9h3YiF1gP7r6zG3k5wC9/logo.png',
  },
  // Add more tokens as needed
};

const FALLBACK_TOKEN = {
  symbol: '???',
  icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', // Use SOL as fallback
};

const TitanSwap: React.FC<TitanSwapProps> = ({ initialInputMint, initialOutputMint }) => {
  const inputToken = TOKEN_MAP[initialInputMint] || FALLBACK_TOKEN;
  const outputToken = TOKEN_MAP[initialOutputMint] || FALLBACK_TOKEN;

  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');

  return (
    <div className="bg-black rounded-2xl p-4 w-[360px] mx-auto text-white shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TitanLogo width={32} height={32} />
          <span className="font-bold text-xl">Titan</span>
        </div>
        <JupButton size="md">Connect Wallet</JupButton>
      </div>
      <div className="bg-[#181C20] rounded-xl p-4 mb-4">
        <div className="mb-2 text-sm text-white/70">Selling</div>
        <div className="flex items-center justify-between bg-[#23272B] rounded-lg p-3 mb-2">
          <div className="flex items-center space-x-3">
            <img src={inputToken.icon} alt={inputToken.symbol} className="w-8 h-8" />
            <span className="font-semibold text-lg">{inputToken.symbol}</span>
          </div>
          <input
            type="text"
            inputMode="decimal"
            pattern="[0-9]*"
            value={inputAmount}
            onChange={e => setInputAmount(e.target.value)}
            placeholder="0.00"
            className="w-24 px-2 py-1 rounded bg-transparent text-right text-2xl font-semibold outline-none border-none hide-number-input-arrows"
            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
          />
        </div>
        <div className="flex justify-between items-center text-xs text-white/50 mt-1">
          <span className="uppercase">{inputToken.symbol}</span>
          <span>{inputAmount || '0.00'}</span>
        </div>
      </div>
      <div className="flex justify-center my-2">
        <div className="bg-[#23272B] rounded-full p-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="#fff" d="M10.707 14.707a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L9 11.586V6a1 1 0 1 1 2 0v5.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-3 3Z"/></svg>
        </div>
      </div>
      <div className="bg-[#181C20] rounded-xl p-4 mb-4">
        <div className="mb-2 text-sm text-white/70">Buying</div>
        <div className="flex items-center justify-between bg-[#23272B] rounded-lg p-3 mb-2">
          <div className="flex items-center space-x-3">
            <img src={outputToken.icon} alt={outputToken.symbol} className="w-8 h-8" />
            <span className="font-semibold text-lg">{outputToken.symbol}</span>
          </div>
          <input
            type="text"
            inputMode="decimal"
            pattern="[0-9]*"
            value={outputAmount}
            onChange={e => setOutputAmount(e.target.value)}
            placeholder="0.00"
            className="w-24 px-2 py-1 rounded bg-transparent text-right text-2xl font-semibold outline-none border-none hide-number-input-arrows"
            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
          />
        </div>
        <div className="flex justify-between items-center text-xs text-white/50 mt-1">
          <span className="uppercase">{outputToken.symbol}</span>
          <span>{outputAmount || '0.00'}</span>
        </div>
      </div>
      <JupButton size="lg" className="w-full bg-[#D1FF8A] text-black font-bold mt-2">Connect Wallet</JupButton>
    </div>
  );
};

export default TitanSwap; 