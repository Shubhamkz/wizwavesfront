"use client";

import React from "react";
import FavouritesCard from "./FavouritesCard";
import { useGetRecentlyPlayedQuery } from "@/redux/features/MusicPlayer/trackEndpoints";
import Loader from "../ui/Loader";

const MyPlaylists = () => {
  const {
    data: recentlyPlayed,
    isLoading,
    refetch,
  } = useGetRecentlyPlayedQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="bg-slate-700 rounded-2xl pr-2">
        <div className="flex justify-between px-5 py-4 bg-slate-700">
          <div>
            <h2 className="font-bold">Recently Played</h2>
          </div>
          <div>
            <div>
              <button className="text-red-500 hover:text-rose-500 hover:scale-105 hover:transition-all">
                See all
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-1 md:max-h-32 overflow-y-scroll custom-scrollbar">
            {recentlyPlayed?.map(({ track }, i) => {
              return <FavouritesCard key={i} track={track} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlaylists;
