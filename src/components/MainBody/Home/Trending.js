"use client";

import React from "react";
import TrendingCard from "./TrendingCard";
import { songsData } from "@/utils/DummyData";
import { useGetTrendingSongsQuery } from "@/redux/features/MusicPlayer/trackEndpoints";
import Loader from "@/components/ui/Loader";

const Trending = () => {
  const { data: getTrendingSongs, isLoading } = useGetTrendingSongsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="col-span-6 md:col-span-2">
      <section>
        <div className="">
          <div className="mb-2 md:mb-4">
            <div className="font-bold text-base lg:text-lg">Trending</div>
          </div>
          <div>
            <div className="flex flex-col gap-2 max-h-64 overflow-y-scroll hide-scrollbar">
              {getTrendingSongs?.map(
                ({ _id, album, name, artists, preview_url }) => (
                  <TrendingCard
                    key={_id}
                    logo={album?.images?.[0]?.url}
                    songName={name}
                    artist={artists?.[0]?.name}
                    preview_url={preview_url}
                    trackId={_id}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trending;
