"use client";

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDeleteTrackMutation } from "@/redux/features/MusicPlayer/trackEndpoints";
import Image from "next/image";
import { dateTimeAgo } from "@/utils/Helper";
import Loader from "@/components/ui/Loader";
import LoaderTwo from "@/components/ui/LoaderTwo";

const MusicListTable = ({
  musicList,
  setIsUpdate,
  setSkip, // Responsible for updating the skip value
  skip,
  limit,
  totalTracks,
  isListLoading,
}) => {
  const [deleteTrack, { isLoading, isSuccess }] = useDeleteTrackMutation();

  const handleDelete = async (id) => {
    await deleteTrack(id);
  };

  const handleLoadMore = () => {
    // Ensure that we only load more if there are tracks left to load
    if (skip + limit < totalTracks) {
      setSkip((prevSkip) => prevSkip + limit); // Increment the skip value by the limit
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsUpdate((prev) => !prev);
    }
  }, [isSuccess]);

  if (isLoading) return <Loader />;

  return (
    <div className="min-w-full">
      <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-3 text-start px-10 md:min-w-[15rem]">Track</th>
            <th className="py-3 text-start px-6 md:min-w-[10rem]">
              Description
            </th>
            <th className="py-3 text-start ">Uploaded At</th>
            <th className="py-3 text-start ">Actions</th>
          </tr>
        </thead>
      </table>
      <div className="md:max-h-[76vh] overflow-y-scroll custom-scrollbar">
        <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
          <tbody>
            {musicList?.map((music, i) => {
              const { name, artists, album, description, createdAt } = music;
              const playlistBgUrl = album?.images?.[0]?.url;

              return (
                <tr key={i} className="bg-gray-700">
                  <td className="px-6 py-4 flex items-center gap-2 md:max-w-[20rem]">
                    <span>
                      <Image
                        className="!w-full !h-auto md:max-w-[5rem] md:min-w-[5rem] rounded-lg"
                        src={playlistBgUrl}
                        alt="bg"
                        width={500}
                        height={500}
                      />
                    </span>
                    <span>
                      <span className="block mb-1">
                        <p className="font-bold">{name}</p>
                      </span>
                      <span className="block">
                        <p className="text-xs text-slate-200">
                          {artists?.[0]?.name}
                        </p>
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {description.length > 20
                      ? `${description.slice(0, 20)}...`
                      : description}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {dateTimeAgo(createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(music._id)}
                      className="bg-red-600 p-2 rounded text-white hover:bg-red-500"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="bg-gray-700 w-full pt-2 pb-6 flex justify-center items-center">
          {isListLoading ? (
            <LoaderTwo />
          ) : (
            skip + limit < totalTracks && (
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 border-[2px] rounded-xl hover:scale-105 transition-all duration-300  bg-gray-900 hover:bg-slate-950"
              >
                Load More
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicListTable;
