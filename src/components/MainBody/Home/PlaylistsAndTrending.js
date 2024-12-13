"use client";

import React from "react";
import Trending from "./Trending";
import TopPlaylist from "./TopPlaylist";
import TrackPlayer from "../Global/TrackPlayer";
import Header from "../Header/Header";
import RecentPlays from "./RecentPlays";
import { useSelector } from "react-redux";

const PlaylistsAndTrending = () => {
  const { isPlayerActive } = useSelector((state) => state.trackPlayer);

  return (
    <>
      <section className="min-h-[100vh] overflow-hidden relative">
        <Header />
        <RecentPlays />
        <div className="px-2 md:px-6 py-4">
          <div className="grid grid-cols-6">
            <Trending />
            <TopPlaylist />
          </div>
        </div>
        {isPlayerActive && <TrackPlayer />}
      </section>
    </>
  );
};

export default PlaylistsAndTrending;
