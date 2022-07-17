import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const LS_FAVORITE_KEY: string = 'rfk';

interface GithubState {
  favorite: string[];
}
const initialState: GithubState = {
  favorite: JSON.parse(localStorage.getItem(LS_FAVORITE_KEY) ?? '[]'),
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      state.favorite.push(action.payload);
      localStorage.setItem(LS_FAVORITE_KEY, JSON.stringify(state.favorite));
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorite = state.favorite.filter((f) => f !== action.payload);
      localStorage.setItem(LS_FAVORITE_KEY, JSON.stringify(state.favorite));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFavorite, removeFavorite } = githubSlice.actions;

export default githubSlice.reducer;
