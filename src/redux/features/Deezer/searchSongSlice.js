import { searchSongs } from "@/lib/deezerApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSongSearch = createAsyncThunk(
  "deezer/songSearch",
  async (keyword) => {
    const data = await searchSongs(keyword);
    return data;
  }
);

const songSearchSlice = createSlice({
  name: "deezer",
  initialState: {
    songs: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.song = action.payload;
      })
      .addCase(fetchSongSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default songSearchSlice.reducer;
