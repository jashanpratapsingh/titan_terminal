import { useEffect, useMemo, useState } from 'react';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import { IFormConfigurator, INITIAL_FORM_CONFIG } from 'src/constants';
import { jsonToBase64 } from 'src/misc/utils';
import { FormProps, IInit } from 'src/types';

import Link from 'next/link';
import ExternalIcon from 'src/icons/ExternalIcon';
// Formatters
import prettierPluginBabel from 'prettier/plugins/babel';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginTypescript from 'prettier/plugins/typescript';
import prettier from 'prettier/standalone';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { cn } from 'src/misc/cn';

const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'), { ssr: false });

const CodeBlocks = ({
  formConfigurator,
  displayMode,
}: {
  formConfigurator: IFormConfigurator;
  displayMode: IInit['displayMode'];
}) => {
  const DISPLAY_MODE_VALUES = (() => {
    if (displayMode === 'modal') return {};
    if (displayMode === 'integrated') return { displayMode: 'integrated', integratedTargetId: 'integrated-terminal' };
    if (displayMode === 'widget') return { displayMode: 'widget' };
  })();

  // Filter out the key that's not default
  const filteredFormProps = Object.keys(formConfigurator.formProps).reduce<Partial<FormProps>>((acc, key) => {
    const itemKey = key as keyof FormProps;
    if (formConfigurator.formProps[itemKey] !== INITIAL_FORM_CONFIG.formProps[itemKey]) {
      acc[itemKey] = formConfigurator.formProps[itemKey] as any;
    }
    return acc;
  }, {});

  const valuesToFormat = {
    ...DISPLAY_MODE_VALUES,
    ...(formConfigurator.defaultExplorer !== 'Solana Explorer'
      ? { defaultExplorer: formConfigurator.defaultExplorer }
      : undefined),
    ...(Object.keys(filteredFormProps || {}).length > 0 ? { formProps: filteredFormProps } : undefined),
    ...(formConfigurator.simulateWalletPassthrough ? { enableWalletPassthrough: true } : undefined),
  };

  const formPropsSnippet = Object.keys(valuesToFormat).length > 0 ? JSON.stringify(valuesToFormat, null, 4) : '';

  const USE_WALLET_SNIPPET = `
  import { useWallet } from '@solana/wallet-adapter-react' // Or @jup-ag/wallet-adapter;
  const passthroughWalletContextState = useWallet();

  // To make sure passthrough wallet are synced
  useEffect(() => {
    if (!window.Titan.syncProps) return;
    window.Titan.syncProps({ passthroughWalletContextState });
  }, [passthroughWalletContextState.connected, props]);
`;

  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  const headTag = `<!-- Attach the loading script in your <head /> -->
<script src='${origin}/main-v4.js'></script>
`;

  const bodyTag = useMemo(() => {
    if (displayMode === 'integrated') {
      return `<!-- Prepare a div in your <body> for Titan to render -->
<!-- Adjust the width and height to suit your requirements -->
<div id="integrated-terminal" style="width: 400px; height: 568px;"></div>
`;
    }

    return '';
  }, [displayMode]);

  const INIT_SNIPPET = `
  // Initialize Titan in your app
  window.Titan.init(${formPropsSnippet});
  `;
  const unformattedSnippet = [formConfigurator.simulateWalletPassthrough ? USE_WALLET_SNIPPET : '', INIT_SNIPPET].join(
    '\n',
  );

  const { data: npmSnippet, refetch: refetchNpmSnippet } = useQuery<string>(
    ['npmSnippet'],
    async () => {
      const formatted = prettier.format(
        `
        // npm install @jup-ag/terminal
        import '@jup-ag/terminal/css';

        const walletProps = useWallet();
        useEffect(() => {
          if (typeof window !== "undefined") {
            import("@jup-ag/terminal").then((mod) => {
              const init = mod.init;
              init(${formPropsSnippet});
            });
          }
        }, []);
        `,
        {
          parser: 'typescript',
          plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginTypescript],
        },
      );
      return formatted;
    },
    {
      initialData: '',
    },
  );

  const [snippet, setSnippet] = useState(``);
  useEffect(() => {
    prettier
      .format(unformattedSnippet, {
        parser: 'typescript',
        plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginTypescript],
      })
      .then((res) => {
        setSnippet(res);
        refetchNpmSnippet();
      });
  }, [unformattedSnippet, refetchNpmSnippet]);

  const documentSnippet = useMemo(() => [headTag, bodyTag].filter(Boolean).join('\n'), [headTag, bodyTag]);

  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  const copyToClipboard = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(snippet);
    setIsCopied(true);
  };

  const [isCopiedShareLink, setIsCopiedShareLink] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsCopiedShareLink(false);
    }, 2000);
  }, [isCopiedShareLink]);
  const copyShareLink = () => {
    if (typeof window === 'undefined') return;

    const stringifiedQuery = JSON.stringify(jsonToBase64(valuesToFormat));
    navigator.clipboard.writeText(`${window.location.origin}?import=${stringifiedQuery.replaceAll('"', '')}`);
    setIsCopiedShareLink(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <h2 className="text-lg font-bold mb-2 text-white">How to Integrate Titan</h2>
      <div className="mb-4 text-sm text-[#9D9DA6]">
        <p>
          <b>Modal:</b> Titan renders as a modal and takes up the whole screen.<br />
          <b>Integrated:</b> Titan renders as a part of your dApp.<br />
          <b>Widget:</b> Titan renders as a floating widget that can be placed at different positions on your dApp.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold text-white mb-1">1. Add Titan Script</h3>
        <pre className="bg-[#181C20] text-xs text-white rounded p-3 overflow-x-auto">
{headTag}
        </pre>
      </div>
      {bodyTag && (
        <div className="mb-4">
          <h3 className="font-semibold text-white mb-1">2. Add Target Div (Integrated Only)</h3>
          <pre className="bg-[#181C20] text-xs text-white rounded p-3 overflow-x-auto">
{bodyTag}
          </pre>
        </div>
      )}
      <div className="mb-4">
        <h3 className="font-semibold text-white mb-1">3. Initialize Titan</h3>
        <pre className="bg-[#181C20] text-xs text-white rounded p-3 overflow-x-auto">
{INIT_SNIPPET}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlocks;
