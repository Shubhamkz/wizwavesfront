"use client";

import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { activatePlayer } from "@/redux/features/MusicPlayer/trackPlayerSlice";
import {
  toggleModal,
  setTrackId,
} from "@/redux/features/Playlist/saveToPlaylist";
import {
  useAddToRecentlyPlayedMutation,
  useUpdateCountMutation,
} from "@/redux/features/MusicPlayer/trackEndpoints";

const PerformOperation = ({ isHovered, isPlaylist, track, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [addToRecents] = useAddToRecentlyPlayedMutation();
  const [updateCount] = useUpdateCountMutation();

  const { name, artists, album, preview_url, _id } = track || {};

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
      className={`absolute z-20 bottom-[-50px] right-2 transition-all duration-500 ${
        isHovered ? "-translate-y-12 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="flex gap-2">
        <div
          className={`transform transition-transform duration-500 ease-out ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <FontAwesomeIcon
            onClick={() => {
              dispatch(toggleModal());
              if (_id) {
                dispatch(setTrackId(_id));
              }
            }}
            className="text-[11px] pl-[7px] pr-[8px] py-2 bg-[#0e0e0e8a] rounded-full hover:scale-[1.3] cursor-pointer transition-all hover:bg-[#f25252] focus:scale-[1.1]"
            icon={faHeart}
          />
        </div>
        {!isPlaylist && (
          <div
            onClick={handleTrackPlay}
            className={`transform transition-transform duration-700 ease-out delay-200 ${
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <FontAwesomeIcon
              className="text-[11px] px-[9px] py-2 bg-[#0e0e0e8a] rounded-full"
              icon={faPlay}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformOperation;
