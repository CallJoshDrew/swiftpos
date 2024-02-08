import { atomWithStorage } from 'jotai/utils';

// Define your atom with localStorage
export const takeAwayOrderCountAtom = atomWithStorage('takeAwayOrderCount', 1);