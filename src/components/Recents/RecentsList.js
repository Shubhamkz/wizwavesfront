"use client";

import React, { useEffect, useRef, useState } from "react";
import Loader from "../ui/Loader";
import video from "@/assets/video-2.mp4";
import RecentCard from "./RecentCard";
import { useGetRecentlyPlayedQuery } from "@/redux/features/MusicPlayer/trackEndpoints";

const RecentsList = () => {
  const {
    data: recentlyPlayed,
    isLoading,
    refetch,
  } = useGetRecentlyPlayedQuery();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleLoadedData = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 3; // Skip the first 3 seconds
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    if (videoRef.current) {
      // Set the video currentTime to (duration - 2 seconds)
      videoRef.current.currentTime = videoRef.current.duration - 4;
      videoRef.current.play();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", handleEnded);
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  if (isLoading) return <Loader />;
  return (
    <section className="grid grid-cols-12 px-2 md:px-6 gap-0 md:gap-4">
      <div className="col-span-12 md:col-span-9 w-full">
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-300 mb-4">
            Recently Played By You
          </h2>
        </div>
        <div className="w-full max-h-[50vh] md:max-h-[70vh] overflow-y-scroll custom-scrollbar">
          <div className="flex gap-7 flex-col">
            {recentlyPlayed?.map(({ track }, index) => {
              return (
                <RecentCard key={index} favourite={track} sequence={index} />
              );
            })}
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-3  w-full rounded-2xl overflow-hidden   mt-12 h-max">
        <video
          width="600"
          ref={videoRef}
          onLoadedData={handleLoadedData}
          autoPlay
          loop
          muted
          style={{ display: isPlaying ? "block" : "none" }}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default RecentsList;
