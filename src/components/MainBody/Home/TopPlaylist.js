"use client";

import { topPlaylistsData } from "@/utils/DummyData";
import React, { useEffect, useState } from "react";
import TopPlaylistCard from "./TopPlaylistCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { useGetPublicPlaylistsQuery } from "@/redux/features/Playlist/playlistEndpoint";
import Loader from "@/components/ui/Loader";

// RecentPlays component
const TopPlaylist = () => {
  const { accessToken } = useSelector((state) => state.accessToken);
  const { data: publicPlaylists, isLoading } = useGetPublicPlaylistsQuery();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!accessToken) return;
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/featured-playlists",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setPlaylists(response.data.playlists.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, [accessToken]);

  if (isLoading) return <Loader />;

  return (
    <section className="hidden md:block col-span-4">
      <div className="px-6 pb-6">
        <div className="flex justify-between mb-4">
          <div className="font-bold text-base lg:text-lg">
            Top Playlists for you
          </div>
          <div className="px-3">
            <p className="text-gray-200 text-xs">See all</p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {publicPlaylists?.playlists
            ?.slice(0, 4)
            .map(({ _id, name, tracks }) => (
              <TopPlaylistCard
                key={_id}
                name={name}
                tracks={tracks}
                playlistId={_id}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default TopPlaylist;
