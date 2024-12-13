"use client";

import React, { useEffect, useState } from "react";
import PlaylistBanner from "./PlaylistBanner";
import PlaylistCard from "./PlaylistCard";
import MyFavouties from "./MyFavouties";
import MyPlaylists from "./MyPlaylists";
import { useGetPlaylistQuery } from "@/redux/features/Playlist/playlistEndpoint";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../ui/Loader";
import { getAudioDuration, getNextTrackById } from "@/utils/Helper";
import {
  useAddToRecentlyPlayedMutation,
  useUpdateCountMutation,
} from "@/redux/features/MusicPlayer/trackEndpoints";
import { activatePlayer } from "@/redux/features/MusicPlayer/trackPlayerSlice";

const CurrentPlaylist = ({ playlistID }) => {
  const fetchId = playlistID["playlsit-detail"].split("-").at(-1);
  const {
    data: currentPlaylist,
    isLoading,
    refetch,
  } = useGetPlaylistQuery(fetchId);
  const { currentTrack, progress } = useSelector((state) => state.trackPlayer);
  const [currentTrackId, setCurrentTrackId] = useState("");
  const [addToRecents] = useAddToRecentlyPlayedMutation();
  const dispatch = useDispatch();
  const [updateCount] = useUpdateCountMutation();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    refetch();
  }, [refresh]);

  const nextTrack = getNextTrackById(currentPlaylist?.tracks, currentTrackId);

  // Function to play the next track automatically
  const handleTrackPlay = async (song) => {
    if (!song) return; // If there's no song, do nothing

    await addToRecents(song?._id);
    await updateCount(song?._id);
    setCurrentTrackId(song?._id); // Update the current track ID
    dispatch(
      activatePlayer({
        title: song?.name,
        artist: song?.artists?.[0]?.name,
        albumArt: song?.album?.images?.[0]?.url,
        src: song?.preview_url,
      })
    );
  };

  useEffect(() => {
    const checkTrackProgress = async () => {
      if (!currentTrack?.src) return;

      const duration = await getAudioDuration(currentTrack?.src);

      if (progress >= duration - 1 && nextTrack) {
        // If the current track is almost finished, play the next one automatically
        handleTrackPlay(nextTrack);
      }
    };

    checkTrackProgress();
  }, [progress, currentTrack?.src, nextTrack]);

  if (isLoading) return <Loader />;

  return (
    <section className="border-t border-white">
      <div className="grid grid-cols-12 px-4 py-4 gap-3">
        <div className="col-span-8">
          {/* Banner */}
          <PlaylistBanner
            currentPlaylist={currentPlaylist}
            currentTrack={currentTrack}
            setRefresh={setRefresh}
          />

          {/* Songs List */}
          <div className="rounded-lg overflow-hidden mt-4">
            <div className="flex flex-col  md:max-h-72 overflow-y-scroll custom-scrollbar">
              {currentPlaylist?.tracks.map((track, i) => {
                return (
                  <PlaylistCard
                    key={i}
                    track={track}
                    setCurrentTrackId={setCurrentTrackId}
                    addToRecents={addToRecents}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-span-4 px-2 pb-5  h-max rounded-xl">
          <MyFavouties />
          <MyPlaylists />
        </div>
      </div>
    </section>
  );
};

export default CurrentPlaylist;
