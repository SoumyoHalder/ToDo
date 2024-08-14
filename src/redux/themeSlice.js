import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  backgroundImage: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setBackgroundImage(state, action) {
      state.backgroundImage = action.payload;
    },
  },
});

export const { setBackgroundImage } = themeSlice.actions;
export default themeSlice.reducer;
