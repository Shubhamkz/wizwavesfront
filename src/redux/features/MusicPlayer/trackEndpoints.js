// authEndpoints.js

import { APIsSlice } from "../APIs/apiSlice";

export const trackEndpoints = APIsSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadTrack: builder.mutation({
      query: (data) => {
        return {
          url: "/api/tracks",
          method: "POST",
          body: data,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    updateTrack: builder.mutation({
      query: (data) => {
        const { formData, trackId } = data;
        return {
          url: `/api/tracks/${trackId}`,
          method: "PUT",
          body: formData,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getAllTracks: builder.query({
      query: (data) => {
        const { genre, page, year } = data;
        const ifGenre = genre && `&genre=${genre}`;
        const ifPage = page && `page=${page}`;
        const ifYear = year && `&year=${year}`;
        return {
          url: `/api/tracks?${ifPage}${ifGenre}${ifYear}`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    deleteTrack: builder.mutation({
      query: (id) => {
        return {
          url: `/api/tracks/${id}`,
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    youtubeConvert: builder.query({
      query: (url) => {
        return {
          url: `/api/convert?url=${url}`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    searchTrack: builder.query({
      query: (keywords) => {
        return {
          url: `/api/tracks/search?keywords=${keywords}`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    addToRecentlyPlayed: builder.mutation({
      query: (id) => {
        return {
          url: `/api/recents`,
          method: "POST",
          body: {
            trackId: id,
          },
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getRecentlyPlayed: builder.query({
      query: () => {
        return {
          url: `/api/recents`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    updateCount: builder.mutation({
      query: (trackId) => {
        return {
          url: `/api/tracks/updateCount/${trackId}`,
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getTrendingSongs: builder.query({
      query: () => {
        return {
          url: `/api/tracks/trendingTracks`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getTracksByUser: builder.query({
      query: (data) => {
        const { skip, limit } = data;
        return {
          url: `/api/tracks/getTracksByUser?skip=${skip}&limit=${limit}`,
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
  useGetTracksByUserQuery,
  useUploadTrackMutation,
  useGetAllTracksQuery,
  useDeleteTrackMutation,
  useYoutubeConvertQuery,
  useUpdateTrackMutation,
  useSearchTrackQuery,
  useAddToRecentlyPlayedMutation,
  useGetRecentlyPlayedQuery,
  useUpdateCountMutation,
  useGetTrendingSongsQuery,
} = trackEndpoints;
