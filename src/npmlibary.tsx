import { init as ogInit, resume, close, appProps, syncProps } from './library';
import { IInit } from './types';

import { RenderTitan } from '.';

async function init(props: IInit) {
  // Populate Titan object into window object
  (window as any).Titan = { init, resume, close, appProps, syncProps };
  // Populate TitanRenderer into window object
  (window as any).TitanRenderer = {
    RenderTitan: RenderTitan,
  };

  // Call original init function
  await ogInit(props);
}

export { init, resume, close, appProps, syncProps };
