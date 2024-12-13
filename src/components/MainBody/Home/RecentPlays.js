"use client";

import React, { useEffect, useState } from "react";
import RecemtlyPlaysCard from "./RecemtlyPlaysCard";
import { useGetRecentlyPlayedQuery } from "@/redux/features/MusicPlayer/trackEndpoints";
import SavetoPlaylist from "../Global/SavetoPlaylist";
import SavedPlaylists from "@/components/PlaylistDetails/SavedPlaylists";
import Loader from "@/components/ui/Loader";
import { useSelector } from "react-redux";

// RecentPlays component
const RecentPlays = () => {
  const { currentTrack } = useSelector((state) => state.trackPlayer);
  const {
    data: recentlyPlayed,
    isLoading,
    refetch,
  } = useGetRecentlyPlayedQuery();

  useEffect(() => {
    refetch();
  }, [currentTrack]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <div className="px-2 md:px-6 py-6">
        <div className="flex justify-between mb-4">
          <div className="font-bold text-base lg:text-lg">Recently Played</div>
          <div className="px-3">
            <p className="text-gray-200 text-xs">See all</p>
          </div>
        </div>
        <div className="flex max-w-[100vw] overflow-y-scroll md:w-full md:grid md:grid-cols-12 gap-4 hide-scrollbar">
          {recentlyPlayed
            ?.slice(0, 6)
            .map(
              ({ track }, i) =>
                track && <RecemtlyPlaysCard key={i} track={track} />
            )}
        </div>
        {/* Save to Playlist  */}
        <SavetoPlaylist modalContent={<SavedPlaylists />} />
        {/* <TrackTester /> */}
      </div>
    </section>
  );
};

export default RecentPlays;
