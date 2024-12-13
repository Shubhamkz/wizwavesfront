"use client";

import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";

const PlaylistLayers = ({ playlistBgUrl }) => {
  const [isPlay, setIsPlay] = useState(false);

  return (
    <div>
      {/* Main wrapper for both images */}
      <div className="w-full mb-1 relative">
        {/* Background Image */}
        <Image
          className="!w-full !h-auto lg:max-w-[10rem] md:min-h-[8rem] rounded-lg absolute top-1 left-1 border-[1px] border-gray-600"
          src={playlistBgUrl}
          alt="bg"
          width={500}
          height={500}
        />

        {/* Foreground Image with hover effect */}
        <div
          className="absolute top-2 left-2 w-full"
          onMouseEnter={() => setIsPlay(true)}
          onMouseLeave={() => setIsPlay(false)}
        >
          <Image
            className="!w-full !h-auto lg:max-w-[10rem] md:min-h-[8rem] rounded-lg border-[1px] border-gray-600"
            src={playlistBgUrl}
            alt="bg"
            width={500}
            height={500}
          />

          {/* Overlay that shows when hovered */}
          {isPlay && (
            <div className="absolute top-0 left-0 bg-[#0b0b0b82] w-full h-full z-20 flex justify-center items-center">
              <div className="flex gap-2">
                <FontAwesomeIcon
                  className="text-sm text-white"
                  icon={faPlayCircle}
                />
                <p className="text-white text-sm font-bold">Play</p>
              </div>
            </div>
          )}
        </div>

        {/* Re-rendered Image */}
        <Image
          className="!w-full !h-auto lg:max-w-[10rem] md:min-h-[8rem] rounded-lg border-[1px] border-gray-600"
          src={playlistBgUrl}
          alt="bg"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default PlaylistLayers;
