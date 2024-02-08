import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Define your atom with localStorage
export const tablesAtom = atomWithStorage('tables', []);

// Define an atom to fetch data
export const fetchTablesAtom = atom(
  get => get(tablesAtom),
  async (get, set) => {
    if (get(tablesAtom).length === 0) {
      const response = await fetch("/api/tableNames");
      const data = await response.json();
      set(tablesAtom, data);
    }
  }
);