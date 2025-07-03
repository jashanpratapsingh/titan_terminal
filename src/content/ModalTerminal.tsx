import React, { useEffect, useRef, useState } from 'react';
import { DEFAULT_EXPLORER, FormProps } from 'src/types';
import WalletDisconnectedGraphic from 'src/icons/WalletDisconnectedGraphic';
import TitanSwap from '../components/TitanSwap';

const ModalTerminal = (props: {
  formProps: FormProps;
  simulateWalletPassthrough: boolean;
  defaultExplorer: DEFAULT_EXPLORER;
}) => {
  const { formProps, simulateWalletPassthrough, defaultExplorer } = props;

  const [showTitanModal, setShowTitanModal] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [titanReady, setTitanReady] = useState(true); // Always ready - no external script dependency

  // Debug logging
  useEffect(() => {
    console.log('[ModalTerminal] Component mounted');
    console.log('[ModalTerminal] Modal ready to use');
  }, []);

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
    console.log('[ModalTerminal] launchTerminal called');
    console.log('[ModalTerminal] Modal functionality ready');
  };

  const handleClick = () => {
    console.log('[ModalTerminal] Click handler called');
    console.log('[ModalTerminal] showTitanModal before:', showTitanModal);
    
    console.log('[ModalTerminal] Setting showTitanModal to true');
    setShowTitanModal(true);
  };

  return (
    <div
      className="p-4 hover:bg-white/10 rounded-xl cursor-pointer flex h-full w-full flex-col items-center justify-center text-white"
      onClick={handleClick}
    >
      <WalletDisconnectedGraphic />
      <span className="text-xs mt-4">Launch Terminal Modal</span>
      {showTitanModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/60">
          <div ref={modalContentRef} className="relative">
            <TitanSwap initialInputMint={formProps.initialInputMint || ''} initialOutputMint={formProps.initialOutputMint || ''} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalTerminal;
