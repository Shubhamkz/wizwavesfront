"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { scrollToTop } from "@/utils/Helper";
import PlaylistLayers from "./PlaylistLayers";

const TopPlaylistCard = ({ name, tracks, playlistId }) => {
  const router = useRouter();
  const playlistBgUrl = tracks?.[0]?.album?.images?.[0]?.url;

  return (
    <div className="col-span-3">
      <div
        onClick={() => {
          router.push(`/playlists/playlist-${playlistId}`);
          scrollToTop();
        }}
        className="cursor-pointer"
      >
        <PlaylistLayers playlistBgUrl={playlistBgUrl} />
        <div className="flex justify-start flex-start flex-col pt-2">
          <div className="mb-1">
            <h2 className="font-bold text-xs lg:text-xs">{name}</h2>
          </div>
          <div>
            <h2 className="text-gray-300 text-[9px] lg:text-[10px]">
              {tracks.length} songs
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPlaylistCard;
