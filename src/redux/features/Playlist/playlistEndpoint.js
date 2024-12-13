// authEndpoints.js

import { APIsSlice } from "../APIs/apiSlice";

export const playlistEndpoints = APIsSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPlaylist: builder.mutation({
      query: (data) => {
        return {
          url: "/api/playlists",
          method: "POST",
          body: data,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getPlaylist: builder.query({
      query: (id) => {
        return {
          url: `/api/playlists/${id}`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getAllPlaylist: builder.query({
      query: (trackID) => {
        const query = trackID ? `?trackID=${trackID}` : "";

        return {
          url: `/api/playlists${query}`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    addTrackToPlaylsit: builder.mutation({
      query: (data) => {
        return {
          url: "/api/playlists/addTrackToPlaylist",
          method: "POST",
          body: data,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    saveToFavourites: builder.mutation({
      query: (trackId) => {
        return {
          url: "/api/auth/saveToFavorites",
          method: "POST",
          body: {
            trackId,
          },
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getFavouriteStatus: builder.query({
      query: (trackID) => {
        return {
          url: `/api/auth/isFavourite?trackId=${trackID}`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getUserPlaylists: builder.query({
      query: (trackID) => {
        const query = trackID ? `?trackID=${trackID}` : "";

        return {
          url: `/api/playlists/getUserPlaylists${query}`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    deletePlaylist: builder.mutation({
      query: (playlistId) => {
        return {
          url: `/api/playlists/${playlistId}`,
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    changePrivacy: builder.mutation({
      query: (data) => {
        const { playlistId, isPublic } = data;

        return {
          url: `/api/playlists/changePrivacy/${playlistId}`,
          method: "PUT",
          body: {
            isPublic,
          },
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getPublicPlaylists: builder.query({
      query: () => {
        return {
          url: `/api/playlists/allPublicPlaylists`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useChangePrivacyMutation,
  useGetUserPlaylistsQuery,
  useCreatePlaylistMutation,
  useGetAllPlaylistQuery,
  useGetPlaylistQuery,
  useAddTrackToPlaylsitMutation,
  useSaveToFavouritesMutation,
  useGetFavouriteStatusQuery,
  useDeletePlaylistMutation,
  useGetPublicPlaylistsQuery,
} = playlistEndpoints;
