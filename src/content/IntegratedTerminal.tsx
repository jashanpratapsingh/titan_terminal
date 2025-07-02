import React, { useCallback, useEffect, useState } from 'react';
import { DEFAULT_EXPLORER, FormProps } from 'src/types';
import { useUnifiedWallet, useUnifiedWalletContext } from '@jup-ag/wallet-adapter';
import TitanSwap from '../components/TitanSwap';

const IntegratedTerminal = (props: {
  formProps: FormProps;
  simulateWalletPassthrough: boolean;
  defaultExplorer: DEFAULT_EXPLORER;
}) => {
  const { formProps, simulateWalletPassthrough, defaultExplorer } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const passthroughWalletContextState = useUnifiedWallet();
  const { setShowModal } = useUnifiedWalletContext();

  const launchTerminal = useCallback(async () => {
    window.Titan.init({
      displayMode: 'integrated',
      integratedTargetId: 'integrated-terminal',

      formProps,
      enableWalletPassthrough: simulateWalletPassthrough,
      passthroughWalletContextState: simulateWalletPassthrough ? passthroughWalletContextState : undefined,
      onRequestConnectWallet: () => setShowModal(true),
      defaultExplorer,
    });
  }, [
    defaultExplorer,
    formProps,
    passthroughWalletContextState,
    setShowModal,
    simulateWalletPassthrough,
  ]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (!isLoaded || !window.Titan.init) {
      intervalId = setInterval(() => {
        setIsLoaded(Boolean(window.Titan.init));
      }, 500);
    }

    if (intervalId) {
      return () => clearInterval(intervalId);
    }
  }, [isLoaded]);

  useEffect(() => {
    setTimeout(() => {
      if (isLoaded && Boolean(window.Titan.init)) {
        launchTerminal();
      }
    }, 200);
  }, [isLoaded, simulateWalletPassthrough, props, launchTerminal]);

  // To make sure passthrough wallet are synced
  useEffect(() => {
    if (!window.Titan.syncProps) return;
    window.Titan.syncProps({ passthroughWalletContextState });
  }, [passthroughWalletContextState, props]);

  return (
    <div className=" w-full rounded-2xl text-white flex flex-col items-center  mb-4 overflow-hidden mt-9">
      <div className="flex flex-col lg:flex-row h-full w-full overflow-auto">
        <div className="w-full h-full rounded-xl overflow-hidden flex justify-center">
          {/* TitanSwap UI template */}
          <TitanSwap initialInputMint={formProps.initialInputMint || ''} initialOutputMint={formProps.initialOutputMint || ''} />
        </div>
      </div>
    </div>
  );
};

export default IntegratedTerminal;
