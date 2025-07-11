import React, { useCallback, useMemo } from 'react';
import { useSwapContext } from 'src/contexts/SwapContext';
import RefreshSVG from 'src/icons/RefreshSVG';

import TitanLogo from '../icons/TitanLogo';

import { WalletButton } from './WalletComponents';
import { useAccounts } from 'src/contexts/accounts';

const Header: React.FC<{ setIsWalletModalOpen(toggle: boolean): void }> = ({ setIsWalletModalOpen }) => {
  const { form, refresh, enableWalletPassthrough } = useSwapContext();
  const { refresh: refreshAccounts } = useAccounts();

  const onRefresh = useCallback(() => {
    refreshAccounts();
    refresh();
  }, [refreshAccounts, refresh]);

  const jupiterDirectLink = useMemo(() => {
    return `https://jup.ag/swap/${form.fromMint}-${form.toMint}?inAmount=${form.fromValue}`;
  }, [form]);

  return (
    <div className="mt-2 h-7 pl-3 pr-2">
      <div className="w-full flex items-center justify-between ">
        <a href="https://titandex.io" target={'_blank'} rel="noreferrer noopener" className="flex items-center space-x-2">
          <TitanLogo width={24} height={24} />
          <span className="font-bold text-sm text-white">Titan</span>
        </a>

        <div className="flex space-x-1 items-center">
          <button
            type="button"
            className="p-2 h-7 w-7 flex items-center justify-center border rounded-full border-white/10 bg-black/10 text-white/50 fill-current"
            onClick={onRefresh}
          >
            <RefreshSVG />
          </button>
          {!enableWalletPassthrough && <WalletButton setIsWalletModalOpen={setIsWalletModalOpen} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
