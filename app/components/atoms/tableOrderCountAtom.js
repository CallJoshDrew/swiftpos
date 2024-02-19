import { atomWithStorage } from 'jotai/utils';

// Define your atom with localStorage
export const tableOrderCountAtom = atomWithStorage('tableOrderCount', 1);