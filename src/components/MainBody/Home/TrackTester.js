"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongsByCountry } from "@/redux/features/ShazamSlice/getSongsByCountrySlice";

// TrackTester component for testing playback
const TrackTester = () => {
  const dispatch = useDispatch();
  const { songs, status, error } = useSelector(
    (state) => state.getTopSongsByCountry
  );

  useEffect(() => {
    // Fetch songs by country when the component mounts
    dispatch(fetchSongsByCountry("IN"));
  }, [dispatch]);

  // Play track handler
  const playTrack = (url) => {
    console.log("Attempting to play URL:", url);
    if (!url) {
      console.error("No URL provided for playback.");
      return;
    }

    try {
      const audio = new Audio(url);
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  return (
    <section className="px-6 py-6">
      <div className="font-bold text-base lg:text-lg mb-4">Track Tester</div>
      {status === "loading" && <p>Loading tracks...</p>}
      {status === "failed" && <p>Error fetching tracks: {error}</p>}

      <div className="grid grid-cols-12 gap-4">
        {songs?.hits?.slice(0, 6).map(({ track }, i) => (
          <div key={i} className="col-span-4 p-4 bg-gray-800 rounded">
            <p className="text-white">{track.title}</p>
            <button
              onClick={() => playTrack(track.url)}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrackTester;
