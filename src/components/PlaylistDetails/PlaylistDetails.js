"use client";

import React from "react";
import Header from "../MainBody/Header/Header";
import CurrentPlaylist from "./CurrentPlaylist";
import TrackPlayer from "../MainBody/Global/TrackPlayer";
import { useSelector } from "react-redux";

const PlaylistDetails = ({ playlistID }) => {
  const { isPlayerActive } = useSelector((state) => state.trackPlayer);

  return (
    <section className="col-span-9 max-h-[100vh] relative">
      <Header />
      <CurrentPlaylist playlistID={playlistID} />
      {isPlayerActive && <TrackPlayer />}
    </section>
  );
};

export default PlaylistDetails;
