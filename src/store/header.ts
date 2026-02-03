import { create } from 'zustand';

export type HeaderTheme = 'transparent' | 'light' | 'dark';

interface HeaderState {
  theme: HeaderTheme;
  setTheme: (theme: HeaderTheme) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  theme: 'transparent', // Default theme
  setTheme: (theme) => set({ theme }),
}));
