import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/userAuth/authSlice";
import authDataSlice from "./features/userAuth/authDataSlice";
import { APIsSlice } from "./features/APIs/apiSlice";
import accessTokenSlice from "./features/userAuth/accessTokenSlice";
import trackPlayerSlice from "./features/MusicPlayer/trackPlayerSlice";
import getSongDetailsSlice from "./features/ShazamSlice/getSongDetailSlice";
import topSongsSlice from "./features/ShazamSlice/getSongsByCountrySlice";
import searchSongSlice from "./features/Deezer/searchSongSlice";
import musicUploadSlice from "./features/MusicPlayer/musicUploadSlice";
import playlistSlice from "./features/Playlist/playlistSlice";
import saveToPlaylist from "./features/Playlist/saveToPlaylist";
import sidebarToggleSlice from "./features/MusicPlayer/sidebarToggleSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [APIsSlice.reducerPath]: APIsSlice.reducer,
      auth: authReducer,
      authData: authDataSlice,
      accessToken: accessTokenSlice,
      trackPlayer: trackPlayerSlice,
      getSongDetails: getSongDetailsSlice,
      getTopSongsByCountry: topSongsSlice,
      searchedSong: searchSongSlice,
      trackData: musicUploadSlice,
      createPlaylist: playlistSlice,
      saveTrack: saveToPlaylist,
      sidebarIsOpen: sidebarToggleSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "institutionVerification/setLogo",
            "institutionVerification/setDocument",
          ],
          ignoredPaths: [
            "institutionVerification.logo",
            "institutionVerification.document",
          ],
        },
      }).concat(APIsSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};
