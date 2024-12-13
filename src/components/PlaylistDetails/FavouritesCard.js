import {
  useAddToRecentlyPlayedMutation,
  useUpdateCountMutation,
} from "@/redux/features/MusicPlayer/trackEndpoints";
import { activatePlayer } from "@/redux/features/MusicPlayer/trackPlayerSlice";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

const FavouritesCard = ({ track }) => {
  const dispatch = useDispatch();
  const [addToRecents] = useAddToRecentlyPlayedMutation();
  const [updateCount] = useUpdateCountMutation();

  const handleTrackPlay = async () => {
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
    <div className="flex items-center justify-between px-4 py-3 bg-slate-700 hover:bg-gray-800 transition duration-300 rounded-2xl cursor-pointer">
      {/* Track Details */}
      <div onClick={handleTrackPlay} className="flex items-center space-x-4">
        {/* Album Art */}

        <Image
          className="w-9 h-9 rounded-full"
          src={track.album.images[0].url}
          alt={"Album Art"}
          height={600}
          width={600}
        />

        {/* Track Name and Artist */}
        <div>
          <h3 className="text-white font-semibold text-sm">{track.name}</h3>
          <p className="text-gray-400 text-xs">
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>

      {/* Other Actions */}
      <div className="flex items-center space-x-4">
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="text-base text-gray-400 hover:text-white transition duration-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default FavouritesCard;
