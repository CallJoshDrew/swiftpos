import { atomWithStorage } from 'jotai/utils';

export const todayRegisteredAtom = atomWithStorage('todayRegistered', {openForRegister: false});