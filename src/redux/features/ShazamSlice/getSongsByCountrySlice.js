import { fetchTopSongsByCountry } from "@/lib/shazamApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSongsByCountry = createAsyncThunk(
  "topSongs/fetchTopSongsByCountry",
  async (countryCode) => {
    const data = await fetchTopSongsByCountry(countryCode);
    return data;
  }
);

const topSongsSlice = createSlice({
  name: "topSongs",
  initialState: {
    songs: [],
    status: "idle", // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongsByCountry.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchSongsByCountry.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songs = action.payload; // Assuming payload contains the `tracks`
      })
      .addCase(fetchSongsByCountry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch top songs";
      });
  },
});

export default topSongsSlice.reducer;
