import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PublicKey } from '@solana/web3.js';

interface WalletContextState {
  publicKey: PublicKey | null;
  connecting: boolean;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextState | undefined>(undefined);

export const useWalletPassThrough = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletPassThrough must be used within a WalletPassThroughProvider');
  }
  return context;
};

interface WalletPassThroughProviderProps {
  children: ReactNode;
}

export const WalletPassThroughProvider: React.FC<WalletPassThroughProviderProps> = ({ children }) => {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connect = async () => {
    setConnecting(true);
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPublicKey(new PublicKey('11111111111111111111111111111111'));
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    setPublicKey(null);
  };

  const value: WalletContextState = {
    publicKey,
    connecting,
    connected: !!publicKey,
    connect,
    disconnect,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
