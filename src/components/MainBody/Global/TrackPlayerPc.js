"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

const TrackPlayerPc = ({
  updateVolume,
  currentTrack,
  handlePlayPause,
  isPlaying,
  progress,
  audioRef,
  formatTime,
  volume,
  isMobileView,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
      {/* Song Info */}
      <div
        className={`${
          isMobileView ? " flex" : "hidden md:flex"
        } items-center gap-4`}
      >
        <img
          src={currentTrack?.albumArt || "/path-to-default-album-art.jpg"}
          alt="Album Art"
          className="w-68 h-60 md:w-16 md:h-16 rounded-md"
        />
        <div className={`track-info hidden md:flex flex-col `}>
          <p className="text-white font-bold !text-sm md:!text-base">
            {currentTrack?.title}{" "}
          </p>
          <p className="text-gray-300 text-xs md:text-sm">
            {currentTrack?.artist.length > 30
              ? `${currentTrack?.artist.slice(0, 30)}...`
              : currentTrack?.artist}
          </p>
        </div>
      </div>

      {isMobileView && (
        <div className="block md:hidden mb-4">
          {" "}
          <div className={`flex flex-col w-full py-5`}>
            <p className="text-white font-bold !text-xl md:!text-lg">
              {currentTrack?.title}{" "}
            </p>
            <p className="text-gray-300 text-xs md:text-sm">
              {currentTrack?.artist.length > 30
                ? `${currentTrack?.artist.slice(0, 30)}...`
                : currentTrack?.artist}
            </p>
          </div>
        </div>
      )}

      {/* Player Controls */}
      <div className="flex flex-col items-center">
        <div className="flex gap-6 items-center">
          <FontAwesomeIcon
            className="cursor-pointer text-white text-xs md:text-base"
            icon={faBackward}
            // Add previous track logic if needed
          />
          <FontAwesomeIcon
            className={`cursor-pointer text-white  ${
              isMobileView ? "text-5xl" : "text-xl"
            }  md:text-3xl`}
            icon={isPlaying ? faPause : faPlay}
            onClick={handlePlayPause}
          />
          <FontAwesomeIcon
            className="cursor-pointer text-white text-xs md:text-base"
            icon={faForward}
            // Add next track logic if needed
          />
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 text-xs text-white mt-2">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            className={`${
              isMobileView ? "w-56 h-1" : "w-32 h-[2px]"
            } md:w-64  md:h-1 bg-gray-400 rounded-lg appearance-none cursor-pointer`}
            min="0"
            max={audioRef.current?.duration || 100}
            value={progress}
            onChange={(e) =>
              (audioRef.current.currentTime = Number(e.target.value))
            }
          />
          <span>
            {audioRef.current?.duration
              ? formatTime(audioRef.current.duration)
              : "0:00"}
          </span>
        </div>
      </div>

      {/* Volume Control */}
      <div
        className={`${
          isMobileView ? "flex mt-8" : "hidden"
        }  md:flex items-center gap-4 z-20`}
      >
        <FontAwesomeIcon className="text-white" icon={faVolumeUp} />
        <input
          type="range"
          className="w-28 md:w-20 h-1 bg-gray-400 rounded-lg appearance-none cursor-pointer"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => dispatch(updateVolume(Number(e.target.value)))}
        />
      </div>
    </div>
  );
};

export default TrackPlayerPc;
