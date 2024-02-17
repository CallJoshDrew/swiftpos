import { atomWithStorage } from 'jotai/utils';

// Define your atom with localStorage
export const selectedTableIndexAtom = atomWithStorage('selectedTableIndex', null);