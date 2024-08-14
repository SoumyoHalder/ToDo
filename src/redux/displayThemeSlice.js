import { createSlice } from '@reduxjs/toolkit';

const displayThemeSlice = createSlice({
  name: 'displayTheme',
  initialState: {
    mode: 'light',
  },
  reducers: {
    setLightTheme: (state) => {
      state.mode = 'light';
    },
    setDarkTheme: (state) => {
      state.mode = 'dark';
    },
  },
});

export const { setLightTheme, setDarkTheme } = displayThemeSlice.actions;
export default displayThemeSlice.reducer;
