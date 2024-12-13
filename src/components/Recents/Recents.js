"use client";

import React from "react";
import Header from "../MainBody/Header/Header";
import TrackPlayer from "../MainBody/Global/TrackPlayer";
import { useSelector } from "react-redux";
import RecentsList from "./RecentsList";
import SavetoPlaylist from "../MainBody/Global/SavetoPlaylist";
import SavedPlaylists from "../PlaylistDetails/SavedPlaylists";

const Recents = () => {
  const { isPlayerActive } = useSelector((state) => state.trackPlayer);

  return (
    <main className="min-h-[100vh] overflow-hidden relative">
      <Header />
      <RecentsList />
      {isPlayerActive && <TrackPlayer />}
      <SavetoPlaylist modalContent={<SavedPlaylists />} />
    </main>
  );
};

export default Recents;
