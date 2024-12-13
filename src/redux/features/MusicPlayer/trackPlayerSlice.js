import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlayerActive: false,
  isPlaying: false,
  currentTrack: null,
  progress: 0,
  volume: 60,
};

const trackPlayerSlice = createSlice({
  name: "trackPlayer",
  initialState,
  reducers: {
    activatePlayer: (state, action) => {
      state.isPlayerActive = true;
      state.currentTrack = action.payload; // Track info sent in payload
    },
    deActivatePlayer: (state) => {
      state.isPlayerActive = false;
      state.isPlaying = false;
      state.currentTrack = null;
      state.progress = 0;
      state.volume = 60;
    },
    playTrack: (state) => {
      state.isPlaying = true;
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    },
    updateProgress: (state, action) => {
      state.progress = action.payload; // Progress (in seconds)
    },
    updateVolume: (state, action) => {
      state.volume = action.payload; // Volume level
    },
  },
});

export const {
  activatePlayer,
  deActivatePlayer,
  playTrack,
  pauseTrack,
  updateProgress,
  updateVolume,
} = trackPlayerSlice.actions;

export default trackPlayerSlice.reducer;
