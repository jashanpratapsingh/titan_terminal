import React, { useCallback, useEffect, useState } from 'react';
import JupButton from 'src/components/JupButton';
import LeftArrowIcon from 'src/icons/LeftArrowIcon';
import { cn } from 'src/misc/cn';
import { DEFAULT_EXPLORER, FormProps, WidgetPosition, WidgetSize } from 'src/types';
import TitanSwap from '../components/TitanSwap';
import TitanLogo from 'src/icons/TitanLogo';
import ChevronDownIcon from 'src/icons/ChevronDownIcon';

const WidgetTerminal = (props: {
  formProps: FormProps;
  simulateWalletPassthrough: boolean;

  defaultExplorer: DEFAULT_EXPLORER;
}) => {
  const { formProps, simulateWalletPassthrough, defaultExplorer } = props;
  const [isLoaded, setIsLoaded] = useState(true); // Always loaded - no external script dependency
  const [position, setPosition] = useState<WidgetPosition>('bottom-right');
  const [size, setSize] = useState<WidgetSize>('default');
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [showSwap, setShowSwap] = useState(false);
  const [titanReady, setTitanReady] = useState(true); // Always ready - no external script dependency

  // Debug logging
  useEffect(() => {
    console.log('[WidgetTerminal] Component mounted');
    console.log('[WidgetTerminal] Widget ready to use');
  }, []);

  const launchTerminal = useCallback(() => {
    console.log('[WidgetTerminal] launchTerminal called');
    console.log('[WidgetTerminal] Widget functionality ready');
  }, []);

  useEffect(() => {
    console.log('[WidgetTerminal] Auto-launching terminal...');
    launchTerminal();
  }, [isLoaded, props, position, size, launchTerminal]);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  // Close overlay on outside click
  useEffect(() => {
    if (!showSwap) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowSwap(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSwap]);

  const handleButtonClick = () => {
    console.log('[WidgetTerminal] Button click handler called');
    console.log('[WidgetTerminal] showSwap before:', showSwap);
    
    console.log('[WidgetTerminal] Toggling showSwap');
    setShowSwap((v) => !v);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Floating Widget Button */}
      <div
        style={{
          position: 'fixed',
          zIndex: 1000,
          [position.includes('bottom') ? 'bottom' : 'top']: 24 + offsetY,
          [position.includes('right') ? 'right' : 'left']: 24 + offsetX,
        }}
      >
        <button
          ref={buttonRef}
          className="rounded-full bg-black text-white shadow-lg p-3 flex items-center justify-center hover:bg-gray-800"
          onClick={handleButtonClick}
        >
          {showSwap ? (
            <ChevronDownIcon width={24} height={24} />
          ) : (
            <TitanLogo width={40} height={40} />
          )}
        </button>
        {/* TitanSwap Overlay Popup */}
        {showSwap && (
          <div
            ref={overlayRef}
            className="absolute z-[2000] bg-black rounded-2xl shadow-2xl"
            style={{
              minWidth: 360,
              ...(position === 'top-left' && { top: '100%', left: 0, marginTop: 8 }), // open down-right
              ...(position === 'top-right' && { top: '100%', right: 0, marginTop: 8 }), // open down-left
              ...(position === 'bottom-left' && { bottom: '100%', left: 0, marginBottom: 8 }), // open up-right
              ...(position === 'bottom-right' && { bottom: '100%', right: 0, marginBottom: 8 }), // open up-left
            }}
          >
            <TitanSwap initialInputMint={formProps.initialInputMint || ''} initialOutputMint={formProps.initialOutputMint || ''} />
          </div>
        )}
      </div>
      <div className="flex mt-9 px-2 md:px-0">
        <div>
          <div className="relative mt-8 md:mt-0">
            <div className="bg-white/10 rounded-xl flex items-center justify-center w-full md:w-[384px] h-[216px]">
              <span className="text-xs text-white/50 text-center w-[70%]">
                Click on the arrows to see how the Titan Widget will appear on your web browser.
                <br />
                Click on the logo to view the Titan Swap Modal.
              </span>

              {/* Top left  */}
              <div
                className={cn('absolute left-1 top-1 cursor-pointer hover:bg-black/20 rounded-full p-1', {
                  'ring-1 ring-white/50': position === 'top-left',
                })}
                onClick={() => setPosition('top-left')}
              >
                <div className="rotate-45">
                  <LeftArrowIcon width={24} height={24} />
                </div>
              </div>

              {/* Top right  */}
              <div
                className={cn('absolute right-1 top-1 cursor-pointer hover:bg-black/20 rounded-full p-1', {
                  'ring-1 ring-white/50': position === 'top-right',
                })}
                onClick={() => setPosition('top-right')}
              >
                <div className="rotate-[135deg]">
                  <LeftArrowIcon width={24} height={24} />
                </div>
              </div>

              {/* Bottom left  */}
              <div
                className={cn('absolute left-1 bottom-1 cursor-pointer hover:bg-black/20 rounded-full p-1', {
                  'ring-1 ring-white/50': position === 'bottom-left',
                })}
                onClick={() => setPosition('bottom-left')}
              >
                <div className="-rotate-45">
                  <LeftArrowIcon width={24} height={24} />
                </div>
              </div>

              {/* Bottom right  */}
              <div
                className={cn('absolute right-1 bottom-1 cursor-pointer hover:bg-black/20 rounded-full p-1', {
                  'ring-1 ring-white/50': position === 'bottom-right',
                })}
                onClick={() => setPosition('bottom-right')}
              >
                <div className="rotate-[225deg]">
                  <LeftArrowIcon width={24} height={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold">Set Size</span>

            <div className="space-x-2 p-1.5 mt-2 bg-black/30 rounded-xl">
              <JupButton
                size="sm"
                onClick={() => {
                  setSize('sm');
                  setShowSwap(true);
                }}
                className={size === 'sm' ? 'bg-white/10' : 'opacity-20 hover:opacity-70'}
              >
                <div className="flex items-center space-x-2 text-xs">
                  <div>Small</div>
                </div>
              </JupButton>
              <JupButton
                size="sm"
                onClick={() => {
                  setSize('default');
                  setShowSwap(true);
                }}
                className={size === 'default' ? 'bg-white/10' : 'opacity-20 hover:opacity-70'}
              >
                <div className="flex items-center space-x-2 text-xs">
                  <div>Default</div>
                </div>
              </JupButton>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-semibold">Set Offset</span>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-white/50">X:</span>
                <input
                  type="number"
                  value={offsetX}
                  onChange={(e) => setOffsetX(Number(e.target.value))}
                  className="w-16 px-2 py-1 bg-black/30 rounded text-xs text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-white/50">Y:</span>
                <input
                  type="number"
                  value={offsetY}
                  onChange={(e) => setOffsetY(Number(e.target.value))}
                  className="w-16 px-2 py-1 bg-black/30 rounded text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 py-4">
        <div className="border-b border-white/10" />
      </div>
    </div>
  );
};

export default WidgetTerminal;
