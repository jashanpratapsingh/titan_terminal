import { atom } from 'jotai';

const terminalInViewAtom = atom<boolean>(false);

export const getTerminalInView = (): boolean => {
  const store = window.Titan?.store;
  if (!store) {
    console.warn('Titan store is not available.');
    return false;
  }
  return store.get(terminalInViewAtom);
};

export const setTerminalInView = (value: boolean): void => {
  const store = window.Titan?.store;
  if (!store) {
    console.warn('Titan store is not available.');
    return;
  }
  store.set(terminalInViewAtom, value);
};
