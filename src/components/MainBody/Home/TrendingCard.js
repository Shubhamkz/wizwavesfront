"use client";

import {
  useAddToRecentlyPlayedMutation,
  useUpdateCountMutation,
} from "@/redux/features/MusicPlayer/trackEndpoints";
import { activatePlayer } from "@/redux/features/MusicPlayer/trackPlayerSlice";
import { getAudioDuration } from "@/utils/Helper";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const TrendingCard = ({ logo, songName, artist, preview_url, trackId }) => {
  const [trackDuration, setTrackDuration] = useState("");
  const dispatch = useDispatch();
  const [addToRecents] = useAddToRecentlyPlayedMutation();
  const [updateCount] = useUpdateCountMutation();

  useEffect(() => {
    const getTrackDura = async () => {
      const duration = await getAudioDuration(preview_url);

      const formattedTime = formatTime(duration);

      setTrackDuration(formattedTime);
    };

    if (preview_url) {
      getTrackDura();
    }
  }, [preview_url]);

  const handleTrackPlay = async () => {
    await addToRecents(trackId);
    await updateCount(trackId);
    dispatch(
      activatePlayer({
        title: songName,
        artist: artist,
        albumArt: logo,
        src: preview_url,
      })
    );
  };

  return (
    <div
      className="flex justify-between cursor-pointer hover:bg-gradient-to-r from-slate-800 via-slate-950 to-gray-800 px-2 pr-4 py-2 rounded-md"
      onClick={handleTrackPlay}
    >
      <div className="flex gap-4">
        <div className="">
          {logo && (
            <Image
              className="w-20 max-w-16 md:max-w-20 h-12 rounded-xl"
              src={logo}
              alt={"Album Art"}
              height={600}
              width={600}
            />
          )}
        </div>
        <div className="flex justify-center items-center">
          <div>
            <div className="mb-1">
              <h2 className="font-bold text-xs lg:text-xs">{songName}</h2>
            </div>
            <div>
              <h2 className="text-gray-300 text-[11px] lg:text-11px]">
                {artist}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex gap-2">
          <div>
            <p className="text-[11px] text-gray-200 pt-[2px]">
              {trackDuration}
            </p>
          </div>
          <div className="">
            <FontAwesomeIcon
              className=" text-[10px] border-[2px] border-white rounded-full px-[4px] py-[2px]"
              icon={faPlay}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
