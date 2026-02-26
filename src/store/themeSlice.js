import { createSlice } from '@reduxjs/toolkit';

const savedTheme = localStorage.getItem('theme');

const initialState = savedTheme
  ? savedTheme
  : window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: {
    mode: initialState,
  },
  reducers: {   
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      
    }   },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;