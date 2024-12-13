import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  playTrack,
  pauseTrack,
  updateProgress,
  updateVolume,
} from "@/redux/features/MusicPlayer/trackPlayerSlice";
import TrackPlayerPc from "./TrackPlayerPc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const TrackPlayer = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null); // Reference to audio element
  const { isPlaying, currentTrack, progress, volume } = useSelector(
    (state) => state.trackPlayer
  );
  const [isMobileView, setMobileView] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = volume / 100;

      if (isPlaying) {
        audio.play().catch((error) => console.error("Playback error:", error));
      } else {
        audio.pause();
      }
    }

    // Cleanup function to pause audio on component unmount
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [isPlaying, volume, currentTrack]);

  const handleCanPlay = () => {
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((error) => console.error("Playback error:", error));
    }
  };

  // Update progress when the audio time updates
  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    dispatch(updateProgress(currentTime));
  };

  // Play/Pause toggle
  const handlePlayPause = () => {
    if (isPlaying) {
      dispatch(pauseTrack());
    } else {
      dispatch(playTrack());
    }
  };

  // Format time (mm:ss) for progress display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <section
      className={`${
        isMobileView
          ? "bg-slate-900 md:bg-gradient-to-r md:from-[#000000d6] md:via-[#000000bf] md:to-[#111827c7] h-[82vh] md:h-max translate-y-0 transition-all duration-700 bottom-0"
          : "bg-gradient-to-r from-[#000000d6] via-[#000000bf] to-[#111827c7] translate-y-full bottom-28 pb-12 md:pb-0 md:bottom-[5.5rem]"
      }  absolute z-50  left-0 w-full px-3 md:px-6 py-4`}
    >
      <div className="relative block md:hidden">
        <div
          onClick={() => setMobileView((prev) => !prev)}
          className="absolute bottom-0 right-2"
        >
          <FontAwesomeIcon
            className="font-bold bg-gray-700 px-2 py-2 rounded-full cursor-pointer hover:bg-gray-800 hover:scale-125 transition-all duration-500"
            icon={isMobileView ? faChevronDown : faChevronUp}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        onCanPlay={handleCanPlay}
        src={currentTrack?.src} // Track source URL
        onTimeUpdate={handleTimeUpdate} // Track progress update
        onError={(e) => console.error("Audio Error:", e)} // Catch audio errors
      ></audio>

      {/* PC Track Player  */}
      <TrackPlayerPc
        updateVolume={updateVolume}
        currentTrack={currentTrack}
        handlePlayPause={handlePlayPause}
        isPlaying={isPlaying}
        progress={progress}
        audioRef={audioRef}
        formatTime={formatTime}
        volume={volume}
        isMobileView={isMobileView}
      />
    </section>
  );
};

export default TrackPlayer;
