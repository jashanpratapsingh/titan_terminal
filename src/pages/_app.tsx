import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { WalletPassThroughProvider } from 'src/contexts/WalletPassthroughProvider';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

import AppHeader from 'src/components/AppHeader/AppHeader';
import Footer from 'src/components/Footer/Footer';


import { useForm } from 'react-hook-form';
import CodeBlocks from 'src/components/CodeBlocks/CodeBlocks';
import FormConfigurator from 'src/components/FormConfigurator';
import { IFormConfigurator, INITIAL_FORM_CONFIG } from 'src/constants';
import IntegratedTerminal from 'src/content/IntegratedTerminal';
const ModalTerminal = dynamic(() => import('src/content/ModalTerminal'), { ssr: false });
const WidgetTerminal = dynamic(() => import('src/content/WidgetTerminal'), { ssr: false });
import { IInit } from 'src/types';
import V2SexyChameleonText from 'src/components/SexyChameleonText/V2SexyChameleonText';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setTerminalInView } from 'src/stores/jotai-terminal-in-view';
import { cn } from 'src/misc/cn';

const isDevNodeENV = process.env.NODE_ENV === 'development';
const isDeveloping = isDevNodeENV && typeof window !== 'undefined';
// In NextJS preview env settings
const isPreview = Boolean(process.env.NEXT_PUBLIC_IS_NEXT_PREVIEW);

// Debug logging for Titan initialization
console.log('[App] Environment check:', {
  isDevNodeENV,
  isDeveloping,
  isPreview,
  hasWindow: typeof window !== 'undefined',
  nodeEnv: process.env.NODE_ENV
});

if ((isDeveloping || isPreview) && typeof window !== 'undefined') {
  console.log('[App] Initializing Titan in development/preview mode');
  // Initialize an empty value, simulate webpack IIFE when imported
  (window as any).Titan = {};

  // Perform local fetch on development, and next preview
  Promise.all([import('../library'), import('../index')]).then((res) => {
    console.log('[App] Titan library and index imported successfully');
    const [libraryProps, rendererProps] = res;

    (window as any).Titan = libraryProps;
    (window as any).TitanRenderer = rendererProps;
    console.log('[App] Titan initialized on window object:', {
      hasTitan: !!(window as any).Titan,
      hasInit: !!(window as any).Titan?.init,
      hasSyncProps: !!(window as any).Titan?.syncProps
    });
  }).catch((error) => {
    console.error('[App] Error loading Titan library:', error);
  });
} else {
  console.log('[App] Production mode - Titan should be loaded via external script');
  if (typeof window !== 'undefined') {
    // Check if Titan is already loaded
    const checkTitanLoaded = () => {
      console.log('[App] Checking if Titan is loaded:', {
        hasWindow: typeof window !== 'undefined',
        hasTitan: !!(window as any).Titan,
        hasInit: !!(window as any).Titan?.init,
        hasSyncProps: !!(window as any).Titan?.syncProps
      });
    };
    
    // Check immediately
    checkTitanLoaded();
    
    // Check after a delay to see if it loads
    setTimeout(checkTitanLoaded, 2000);
    setTimeout(checkTitanLoaded, 5000);
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [tab, setTab] = useState<IInit['displayMode']>('integrated');

  // Debug logging for component mount
  useEffect(() => {
    console.log('[App] App component mounted');
    console.log('[App] Current tab:', tab);
    console.log('[App] Modal and Widget ready to use');
  }, [tab]);

  // Cleanup on tab change
  useEffect(() => {
    console.log('[App] Tab changed to:', tab);
    if (window.Titan._instance) {
      console.log('[App] Cleaning up Titan instance');
      window.Titan._instance = null;
    }

    setTerminalInView(false);
  }, [tab]);

  const { watch, reset, setValue, formState } = useForm<IFormConfigurator>({
    defaultValues: INITIAL_FORM_CONFIG,
  });

  const watchAllFields = watch();



  const ShouldWrapWalletProvider = useMemo(() => {
    return watchAllFields.simulateWalletPassthrough
      ? ({ children }: { children: ReactNode }) => (
          <WalletPassThroughProvider>
            {children}
          </WalletPassThroughProvider>
        )
      : React.Fragment;
  }, [watchAllFields.simulateWalletPassthrough]);

  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo
        title={'Titan Terminal'}
        openGraph={{
          type: 'website',
          locale: 'en',
          title: 'Titan Terminal',
          description: 'Titan Terminal: An open-sourced, lite version of Titan that provides end-to-end swap flow.',
          url: 'https://terminal.jup.ag/',
          site_name: 'Titan Terminal',
          images: [
            {
              url: `https://static.jup.ag/static/jupiter-meta-main.jpg`,
              alt: 'Titan Aggregator',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: 'jup.ag',
          handle: '@TitanExchange',
        }}
      />

      <div className="bg-[#0B0F19] h-screen w-screen max-w-screen overflow-x-hidden flex flex-col justify-between font-sans">
        <div>
          <AppHeader />

          <div className="">
            <div className="flex flex-col items-center h-full w-full mt-4 md:mt-14">
              <div className="flex flex-col justify-center items-center text-center">
                <div className="flex space-x-2">
                  <V2SexyChameleonText className="text-4xl md:text-[52px] font-semibold px-4 pb-2 md:px-0">
                    Titan: The Meta DEX Aggregator
                  </V2SexyChameleonText>

                  <div className="px-1 py-0.5 bg-gradient-to-r from-[#C7F284] to-[#00BEF0] rounded-md ml-2.5 font-semibold flex text-xs self-start">
                    v4
                  </div>
                </div>
                <p className="text-[#C7F284] max-w-[100%] md:max-w-[60%] text-md mt-4 heading-[24px]">
                  Titan is the next-generation, open-source Meta DEX Aggregator. Experience the best rates, deep liquidity, and seamless swaps across all of DeFi.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="max-w-6xl bg-black/25 mt-12 rounded-xl flex flex-col md:flex-row w-full md:p-4 relative">
                {/* Desktop configurator */}
                <div className="hidden md:flex">
                  <FormConfigurator {...watchAllFields} reset={reset} setValue={setValue} formState={formState} />
                </div>

                <ShouldWrapWalletProvider>
                  <div className="mt-8 md:mt-0 md:ml-4 h-full w-full bg-black/40 rounded-xl flex flex-col">
                    {watchAllFields.simulateWalletPassthrough ? (
                      <div className="absolute right-6 top-8 text-white flex flex-col justify-center text-center">
                        <div className="text-xs mb-1">Simulate dApp Wallet</div>
                        <WalletMultiButton />
                      </div>
                    ) : null}

                    <div className="mt-4 flex justify-center ">
                      <button
                        onClick={() => {
                          setTab('modal');
                        }}
                        type="button"
                        className={cn(
                          '!bg-none relative px-4 justify-center',
                          tab === 'modal' ? '' : 'opacity-20 hover:opacity-70',
                        )}
                      >
                        <div className="flex items-center text-md text-white">
                          {tab === 'modal' ? <V2SexyChameleonText>Modal</V2SexyChameleonText> : 'Modal'}
                        </div>

                        {tab === 'modal' ? (
                          <div className="absolute left-0 bottom-[-8px] w-full h-0.5 bg-gradient-to-r from-titan-purple to-titan-blue" />
                        ) : (
                          <div className="absolute left-0 bottom-[-8px] w-full h-[1px] bg-white/50" />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setTab('integrated');
                        }}
                        type="button"
                        className={cn(
                          '!bg-none relative px-4 justify-center',
                          tab === 'integrated' ? '' : 'opacity-20 hover:opacity-70',
                        )}
                      >
                        <div className="flex items-center text-md text-white">
                          {tab === 'integrated' ? <V2SexyChameleonText>Integrated</V2SexyChameleonText> : 'Integrated'}
                        </div>
                        {tab === 'integrated' ? (
                          <div className="absolute left-0 bottom-[-8px] w-full h-0.5 bg-gradient-to-r from-titan-purple to-titan-blue" />
                        ) : (
                          <div className="absolute left-0 bottom-[-8px] w-full h-[1px] bg-white/50" />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setTab('widget');
                        }}
                        type="button"
                        className={cn(
                          '!bg-none relative px-4 justify-center',
                          tab === 'widget' ? '' : 'opacity-20 hover:opacity-70',
                        )}
                      >
                        <div className="flex items-center text-md text-white">
                          {tab === 'widget' ? <V2SexyChameleonText>Widget</V2SexyChameleonText> : 'Widget'}
                        </div>

                        {tab === 'widget' ? (
                          <div className="absolute left-0 bottom-[-8px] w-full h-0.5 bg-gradient-to-r from-titan-purple to-titan-blue" />
                        ) : (
                          <div className="absolute left-0 bottom-[-8px] w-full h-[1px] bg-white/50" />
                        )}
                      </button>
                    </div>

                    <span className="flex justify-center text-center text-xs text-[#9D9DA6] mt-4">
                      {tab === 'modal' ? 'Titan renders as a modal and takes up the whole screen.' : null}
                      {tab === 'integrated' ? 'Titan renders as a part of your dApp.' : null}
                      {tab === 'widget'
                        ? 'Titan renders as part of a widget that can be placed at different positions on your dApp.'
                        : null}
                    </span>

                    <div className="flex flex-grow items-center justify-center text-white/75">
                      {tab === 'modal' ? (
                        <ModalTerminal
                          formProps={watchAllFields.formProps}
                          simulateWalletPassthrough={watchAllFields.simulateWalletPassthrough}
  
                          defaultExplorer={watchAllFields.defaultExplorer}
                        />
                      ) : null}
                      {tab === 'integrated' ? (
                        <IntegratedTerminal
                          formProps={watchAllFields.formProps}
                          simulateWalletPassthrough={watchAllFields.simulateWalletPassthrough}

                          defaultExplorer={watchAllFields.defaultExplorer}
                        />
                      ) : null}
                      {tab === 'widget' ? (
                        <WidgetTerminal
                          formProps={watchAllFields.formProps}
                          simulateWalletPassthrough={watchAllFields.simulateWalletPassthrough}

                          defaultExplorer={watchAllFields.defaultExplorer}
                        />
                      ) : null}
                    </div>
                  </div>
                </ShouldWrapWalletProvider>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="max-w-6xl bg-black/25 mt-12 rounded-xl flex flex-col md:flex-row w-full md:p-4 relative">
                <div className="mt-8 md:mt-0 md:ml-4 h-full w-full bg-black/40 rounded-xl flex flex-col">
                  <CodeBlocks />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </QueryClientProvider>
  );
}
