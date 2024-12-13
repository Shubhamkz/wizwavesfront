import { fetchSongDetails } from "@/lib/shazamApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSongDetails = createAsyncThunk(
  "shazam/getSongDetails",
  async (trackId) => {
    const data = await fetchSongDetails(trackId);
    return data;
  }
);

const getSongDetailsSlice = createSlice({
  name: "shazam",
  initialState: {
    song: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSongDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSongDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.song = action.payload;
      })
      .addCase(getSongDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default getSongDetailsSlice.reducer;
