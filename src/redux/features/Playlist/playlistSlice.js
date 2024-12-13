// slices/musicUploadSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlistName: "",
  playlistDescription: "",
};

const createPlaylistSlice = createSlice({
  name: "createPlaylist",
  initialState,
  reducers: {
    setPlaylistName: (state, action) => {
      state.playlistName = action.payload;
    },
    setPlaylistDescription: (state, action) => {
      state.playlistDescription = action.payload;
    },
  },
});

export const { setPlaylistName, setPlaylistDescription } =
  createPlaylistSlice.actions;

export default createPlaylistSlice.reducer;
