"use client";

import { useUpdateCountMutation } from "@/redux/features/MusicPlayer/trackEndpoints";
import { activatePlayer } from "@/redux/features/MusicPlayer/trackPlayerSlice";
import { faHeart, faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

const PlaylistCard = ({ track, setCurrentTrackId, addToRecents }) => {
  const dispatch = useDispatch();
  const [updateCount] = useUpdateCountMutation();

  const handleTrackPlay = async () => {
    setCurrentTrackId(track?._id);
    await addToRecents(track?._id);
    await updateCount(track?._id);
    dispatch(
      activatePlayer({
        title: track?.name,
        artist: track?.artists?.[0]?.name,
        albumArt: track?.album?.images?.[0]?.url,
        src: track?.preview_url,
      })
    );
  };

  return (
    <div
      onClick={handleTrackPlay}
      className="flex items-center justify-between p-4 hover:bg-gray-800 transition duration-300 rounded-2xl cursor-pointer"
    >
      {/* Track Details */}
      <div className="flex items-center space-x-4">
        {/* Album Art */}

        <Image
          className="w-12 h-12 rounded-full"
          src={track.album.images[0].url}
          alt={"Album Art"}
          height={600}
          width={600}
        />

        {/* Track Name and Artist */}
        <div>
          <h3 className="text-white font-semibold">{track.name}</h3>
          <p className="text-gray-400 text-sm">
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>

      {/* Other Actions */}
      <div className="flex items-center space-x-4">
        {/* Play Count */}
        <span className="text-gray-400 text-sm hidden sm:block">
          {parseInt(track?.playCount).toLocaleString()} plays
        </span>

        <FontAwesomeIcon
          icon={faHeart}
          className="w-6 h-6 text-gray-400 hover:text-red-500 transition duration-300 cursor-pointer"
        />

        <FontAwesomeIcon
          icon={faShield}
          className="w-6 h-6 text-gray-400 hover:text-white transition duration-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PlaylistCard;
