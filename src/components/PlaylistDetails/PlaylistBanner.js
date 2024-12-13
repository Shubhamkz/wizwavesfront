"use client";

import { useChangePrivacyMutation } from "@/redux/features/Playlist/playlistEndpoint";
import {
  faPeopleGroup,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import LoaderTwo from "../ui/LoaderTwo";

const PlaylistBanner = ({ currentPlaylist, currentTrack, setRefresh }) => {
  const [changePrivacy, { isLoading, isSuccess }] = useChangePrivacyMutation();
  const playlistBg = currentTrack?.albumArt;

  // console.log(currentPlaylist);

  const handleChangePrivacy = async () => {
    await changePrivacy({
      playlistId: currentPlaylist._id,
      isPublic: !currentPlaylist?.isPublic,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        `Playlist is now ${currentPlaylist?.isPublic ? "private" : "public"}`
      );
      setRefresh((prev) => !prev);
    }
  }, [isSuccess]);

  return (
    <div
      className="w-full h-56  relative rounded-xl transition-all duration-700"
      style={{
        backgroundImage: `url(${playlistBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

      {/* Content */}
      <div className="relative grid grid-cols-12 h-full">
        <div className="px-6 py-8 col-span-8 z-10">
          <div className="mb-4">
            <h1 className="font-semibold text-2xl text-white">
              {currentPlaylist?.name}
            </h1>
          </div>
          <div className="mb-6">
            <p className="font-light text-sm text-white">
              {currentPlaylist?.description}
            </p>
          </div>
          <div>
            <div className="flex gap-3">
              <button className="px-6 py-2 text-sm md:text-base text-gray-800 bg-white border-[2px] border-gray-800 rounded-3xl font-medium">
                Follow
              </button>
              {isLoading ? (
                <LoaderTwo />
              ) : (
                <button
                  onClick={handleChangePrivacy}
                  className="px-6 py-2 text-sm md:text-sm text-gray-800 bg-white hover:bg-slate-100 hover:scale-105 transition-all duration-300  border-[2px] border-gray-800 rounded-3xl font-medium"
                >
                  {!currentPlaylist?.isPublic ? (
                    <span className="flex justify-center items-center">
                      <span>
                        <FontAwesomeIcon
                          className="text-xl pr-3"
                          icon={faShieldHalved}
                        />
                      </span>
                      Private
                    </span>
                  ) : (
                    <span className="flex justify-center items-center">
                      <span>
                        <FontAwesomeIcon
                          className="text-xl pr-3"
                          icon={faPeopleGroup}
                        />
                      </span>
                      Public
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistBanner;
