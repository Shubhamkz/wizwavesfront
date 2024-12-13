// authEndpoints.js

import { APIsSlice } from "../APIs/apiSlice";

export const userAuthAPI = APIsSlice.injectEndpoints({
  endpoints: (builder) => ({
    updatePassword: builder.mutation({
      query: (data) => {
        const { passwordData, token } = data;
        return {
          url: "/api/user/updatePassword",
          method: "PUT",
          body: passwordData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getAuthProfile: builder.query({
      query: () => {
        return {
          url: `/api/auth/profile`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/api/auth/register",
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `/api/auth/users`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/auth/user/${id}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateRole: builder.mutation({
      query: ({ role, userId }) => ({
        url: `/api/auth/user/${userId}`, // Use `userId` in the URL
        method: "PUT",
        credentials: "include",
        body: {
          role: role,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useLoginMutation,
  useLogoutMutation,
  useUpdatePasswordMutation,
  useGetAuthProfileQuery,
  useUserRegisterMutation,
  useDeleteUserMutation,
  useUpdateRoleMutation,
} = userAuthAPI;
