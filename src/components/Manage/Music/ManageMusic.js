"use client";

import React, { useState, useEffect } from "react";
import MusicUploadForm from "./MusicUploadForm";
import MusicListTable from "./MusicListTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faUpload } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "@/components/ui/CustomModal";
import { useGetTracksByUserQuery } from "@/redux/features/MusicPlayer/trackEndpoints";
import Loader from "@/components/ui/Loader";

const ManageMusic = () => {
  const [musicList, setMusicList] = useState([]); // To hold all loaded tracks
  const [skip, setSkip] = useState(0); // Track how many items to skip (used for loading more tracks)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const limit = 10; // Define how many tracks to load per request
  const {
    data: getTracksByUser,
    isLoading,
    refetch,
    isSuccess,
    isError,
  } = useGetTracksByUserQuery({ skip, limit }); // Pass skip and limit as parameters

  // Fetch initial tracks or refetch when there is an update (e.g., after upload)
  useEffect(() => {
    refetch();
  }, [isUpdate]);

  // Append newly fetched tracks to the existing list
  useEffect(() => {
    if (isSuccess && getTracksByUser?.tracks) {
      const uniqueTracks = [
        ...new Set([...musicList, ...getTracksByUser.tracks]),
      ];

      setMusicList(uniqueTracks);
    }
  }, [isSuccess, getTracksByUser]);

  if (!isSuccess || isError) return <div>Error fetching tracks</div>;

  return (
    <div className="flex flex-col items-center p-6 col-span-9 relative">
      <div className="flex justify-between w-full">
        <h1 className="text-4xl text-white mb-6 font-bold flex items-center">
          <FontAwesomeIcon icon={faMusic} className="mr-3" />
          Manage Music
        </h1>

        <CustomModal
          modalContent={
            <MusicUploadForm
              setIsModalOpen={setIsModalOpen}
              setIsUpdate={setIsUpdate}
            />
          }
          modalButton={
            <button
              onClick={() => setIsModalOpen(true)}
              className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow flex items-center"
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              Upload Music
            </button>
          }
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>

      {/* Music List Table */}
      <MusicListTable
        musicList={musicList} // Pass the full list of loaded tracks
        setIsUpdate={setIsUpdate}
        setSkip={setSkip} // Set skip for loading more
        skip={skip}
        limit={limit}
        totalTracks={getTracksByUser?.totalTracks}
        isListLoading={isLoading}
      />
    </div>
  );
};

export default ManageMusic;
