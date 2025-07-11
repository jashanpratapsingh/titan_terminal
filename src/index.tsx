import { Provider, useAtom } from 'jotai';
import TitanApp from './components/Titan';
import { ContextProvider } from './contexts/ContextProvider';
import { ScreenProvider } from './contexts/ScreenProvider';
import { TokenContextProvider } from './contexts/TokenContextProvider';
import WalletPassthroughProvider from './contexts/WalletPassthroughProvider';
import { appProps } from './library';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';

const App = () => {
  const queryClient = useMemo(() => new QueryClient(), []);
  const [props] = useAtom(appProps);
  if (!props) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider {...props}>
        <WalletPassthroughProvider>
          <TokenContextProvider {...props}>
            <ScreenProvider>
              <TitanApp {...props} />
            </ScreenProvider>
          </TokenContextProvider>
        </WalletPassthroughProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
};

const RenderTitan = () => {
  return (
    <Provider store={typeof window !== 'undefined' ? window.Titan.store : undefined}>
      <App />
    </Provider>
  );
};

export { RenderTitan };
