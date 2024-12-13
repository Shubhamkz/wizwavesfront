import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  trackId: "",
};

const saveToPlaylistSlice = createSlice({
  name: "savedToPlaylist",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setTrackId: (state, action) => {
      state.trackId = action.payload;
    },
  },
});

export const { toggleModal, setTrackId } = saveToPlaylistSlice.actions;

export default saveToPlaylistSlice.reducer;
