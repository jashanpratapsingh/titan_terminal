import React, { useEffect, useState } from 'react';

import { DEFAULT_EXPLORER, FormProps } from 'src/types';
import WalletDisconnectedGraphic from 'src/icons/WalletDisconnectedGraphic';
import TitanSwap from '../components/TitanSwap';

const IntegratedTerminal = (props: {
  formProps: FormProps;
  simulateWalletPassthrough: boolean;
  defaultExplorer: DEFAULT_EXPLORER;
}) => {
  const { formProps, simulateWalletPassthrough, defaultExplorer } = props;

  const [showTitanSwap, setShowTitanSwap] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('[IntegratedTerminal] Component mounted');
    console.log('[IntegratedTerminal] Integrated terminal ready to use');
  }, []);

  const handleClick = () => {
    console.log('[IntegratedTerminal] Click handler called');
    setShowTitanSwap(true);
  };

  if (showTitanSwap) {
    return (
      <div className="flex items-center justify-center h-full">
        <TitanSwap initialInputMint={formProps.initialInputMint || ''} initialOutputMint={formProps.initialOutputMint || ''} />
      </div>
    );
  }

  return (
    <div
      className="p-4 hover:bg-white/10 rounded-xl cursor-pointer flex h-full w-full flex-col items-center justify-center text-white"
      onClick={handleClick}
    >
      <WalletDisconnectedGraphic />
      <span className="text-xs mt-4">Launch Integrated Terminal</span>
    </div>
  );
};

export default IntegratedTerminal;
