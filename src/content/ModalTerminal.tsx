import React, { useEffect, useRef, useState } from 'react';
import { useUnifiedWalletContext, useUnifiedWallet } from '@jup-ag/wallet-adapter';
import { DEFAULT_EXPLORER, FormProps } from 'src/types';
import WalletDisconnectedGraphic from 'src/icons/WalletDisconnectedGraphic';
import TitanSwap from '../components/TitanSwap';

const ModalTerminal = (props: {
  formProps: FormProps;
  simulateWalletPassthrough: boolean;
  defaultExplorer: DEFAULT_EXPLORER;
}) => {
  const { formProps, simulateWalletPassthrough, defaultExplorer } = props;

  const passthroughWalletContextState = useUnifiedWallet();
  const { setShowModal } = useUnifiedWalletContext();

  const [showTitanModal, setShowTitanModal] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Close modal on outside click
  useEffect(() => {
    if (!showTitanModal) return;
    function handleClickOutside(event: MouseEvent) {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        setShowTitanModal(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTitanModal]);

  const launchTerminal = () => {
    window.Titan.init({
      formProps,
      enableWalletPassthrough: simulateWalletPassthrough,
      passthroughWalletContextState: simulateWalletPassthrough ? passthroughWalletContextState : undefined,
      onRequestConnectWallet: () => setShowTitanModal(true),
      defaultExplorer,
    });
  };

  // To make sure passthrough wallet are synced
  useEffect(() => {
    if (!window.Titan.syncProps) return;
    window.Titan.syncProps({ passthroughWalletContextState });
  }, [passthroughWalletContextState, props]);

  return (
    <div
      className="p-4 hover:bg-white/10 rounded-xl cursor-pointer flex h-full w-full flex-col items-center justify-center text-white"
      onClick={() => setShowTitanModal(true)}
    >
      <WalletDisconnectedGraphic />
      <span className="text-xs mt-4">Launch Terminal Modal</span>
      {showTitanModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/60">
          <div ref={modalContentRef} className="relative">
            <button
              className="absolute -top-4 -right-4 bg-black text-white rounded-full p-2"
              onClick={() => setShowTitanModal(false)}
            >
              ✕
            </button>
            <TitanSwap initialInputMint={formProps.initialInputMint || ''} initialOutputMint={formProps.initialOutputMint || ''} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalTerminal;
