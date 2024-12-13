"use client";

import React from "react";
import Header from "../MainBody/Header/Header";
import TrackPlayer from "../MainBody/Global/TrackPlayer";
import { useSelector } from "react-redux";
import FavouritesList from "./FavouritesList";
import SavetoPlaylist from "../MainBody/Global/SavetoPlaylist";
import SavedPlaylists from "../PlaylistDetails/SavedPlaylists";

const Favourites = () => {
  const { isPlayerActive } = useSelector((state) => state.trackPlayer);

  return (
    <main className=" min-h-[100vh] overflow-hidden relative">
      <Header />
      <FavouritesList />
      {isPlayerActive && <TrackPlayer />}
      {/* Save to Playlist  */}
      <SavetoPlaylist modalContent={<SavedPlaylists />} />
    </main>
  );
};

export default Favourites;
