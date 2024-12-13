"use client";

import {
  useAddToRecentlyPlayedMutation,
  useUpdateCountMutation,
} from "@/redux/features/MusicPlayer/trackEndpoints";
import { activatePlayer } from "@/redux/features/MusicPlayer/trackPlayerSlice";
import {
  setTrackId,
  toggleModal,
} from "@/redux/features/Playlist/saveToPlaylist";
import { getAudioDuration } from "@/utils/Helper";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const FavouriteCard = ({ favourite, sequence }) => {
  const [trackDuration, setTrackDuration] = useState("");
  const dispatch = useDispatch();
  const [addToRecents] = useAddToRecentlyPlayedMutation();
  const [updateCount] = useUpdateCountMutation();

  const { preview_url, name, album, artists, updatedAt, _id } = favourite;

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
    await addToRecents(_id);
    await updateCount(_id);
    dispatch(
      activatePlayer({
        title: name,
        artist: artists?.[0]?.name,
        albumArt: album?.images?.[0]?.url,
        src: preview_url,
      })
    );
  };

  return (
    <div
      onClick={handleTrackPlay}
      className="w-full hover:bg-gray-700 transition-all rounded-lg duration-300 cursor-pointer"
    >
      <table className="table-auto w-full text-left">
        <tbody>
          <tr className="">
            <td className="p-2 text-slate-400 font-bold w-[1rem] md:w-12 text-xs md:text-base">
              {(sequence + 1).toString().length > 1
                ? sequence + 1
                : `0${sequence + 1}`}
            </td>
            <td className="p-2 w-16">
              <Image
                className="min-w-12 min-h-12 w-12 h-12 rounded-lg"
                src={album.images[0].url}
                alt={"Album Art"}
                height={600}
                width={600}
              />
            </td>
            <td className="p-0 md:p-2 md:min-w-64">
              <p className="text-white font-semibold text-[11px] md:text-base">
                {name}
              </p>
              <p className="text-slate-400 text-[10px] md:text-sm font-light">
                {artists?.[0]?.name}
              </p>
            </td>

            <td className="p-2 text-slate-100 text-sm pl-12 hidden md:inline-block">
              {trackDuration}
            </td>
            <td className="p-2 text-slate-500 text-xs px-20 hidden md:inline-block">
              {new Date(updatedAt).toLocaleTimeString()}&nbsp;{" "}
              {new Date(updatedAt).toLocaleDateString()}
            </td>
            <td className="flex justify-end items-end md:hidden pl-3 gap-2 mt-2">
              <p className="p-2 text-slate-100 text-xs  mb-3">
                {trackDuration}
              </p>
              <p className="p-2 flex items-center gap-6  justify-center relative">
                <span className="flex gap-4 md:gap-6 absolute top-0 right-6">
                  {" "}
                  <FontAwesomeIcon
                    onClick={() => {
                      dispatch(toggleModal());
                      if (_id) {
                        dispatch(setTrackId(_id));
                      }
                    }}
                    icon={faHeart}
                    className="text-slate-50 text-xs md:text-base"
                  />
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className="text-slate-50 text-xs md:text-base"
                  />
                </span>
              </p>
            </td>
            <td className="p-2 items-center gap-6 pl-20 justify-center relative hidden md:flex">
              <span className="flex gap-6 absolute -top-4 -translate-y-1/2 right-6">
                {" "}
                <FontAwesomeIcon
                  onClick={() => {
                    dispatch(toggleModal());
                    if (_id) {
                      dispatch(setTrackId(_id));
                    }
                  }}
                  icon={faHeart}
                  className="text-slate-50 text-base"
                />
                <FontAwesomeIcon
                  icon={faEllipsis}
                  className="text-slate-50 text-base"
                />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FavouriteCard;
