import { APIsSlice } from "../APIs/apiSlice";

export const spotifyEndpoints = APIsSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getAccessToken: builder.mutation({
    //   query: (data) => {
    //     const { formData, authData } = data;
    //     return {
    //       url: `/api/admin/adminregisterUser`,
    //       method: "POST",
    //       body: formData,
    //       headers: {
    //         Authorization: `Bearer ${authData.token}`,
    //       },
    //     };
    //   },
    // }),
    // featuredPlaylist: builder.query({
    //   query: (data) => {
    //     const { token, status, page } = data;
    //     return {
    //       url: `/api/eadminRoute/getjobbystatus?status=${status}&page=${page}`,
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     };
    //   },
    // }),
  }),
  overrideExisting: true,
});

export const {
  // useAddUserMutation,
  //   useManageJobsQuery,
} = spotifyEndpoints;
