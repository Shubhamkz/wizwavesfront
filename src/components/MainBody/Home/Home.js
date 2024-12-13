"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "@/redux/features/userAuth/accessTokenSlice";
import { getAccessToken } from "@/utils/getAccessToken";
import PlaylistsAndTrending from "./PlaylistsAndTrending";

const MainHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAccessToken() {
      const token = await getAccessToken();
      if (token) {
        dispatch(setAccessToken({ token }));
      }
    }

    fetchAccessToken();
  }, []);

  return <PlaylistsAndTrending />;
};

export default MainHome;
