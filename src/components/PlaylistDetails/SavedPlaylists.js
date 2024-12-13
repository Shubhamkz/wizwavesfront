"use client";

import {
  useAddTrackToPlaylsitMutation,
  useGetAllPlaylistQuery,
  useGetUserPlaylistsQuery,
} from "@/redux/features/Playlist/playlistEndpoint";
import React, { useEffect, useState } from "react";
import Checkbox from "../ui/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import Loader from "../ui/Loader";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SaveToFavourites from "./SaveToFavourites";

const SavedPlaylists = () => {
  const [checkedPlaylists, setCheckedPlaylists] = useState({});
  const [addToPlaylist, { isSuccess: isSaved, isError, error }] =
    useAddTrackToPlaylsitMutation();
  const { trackId } = useSelector((state) => state.saveTrack);

  const {
    data: getUserPlaylists,
    isLoading,
    refetch,
  } = useGetUserPlaylistsQuery(trackId);
  // const {
  //   data: allPlaylists,
  //   isLoading,
  //   refetch,
  // } = useGetAllPlaylistQuery(trackId);
  const [refresh, setRefresh] = useState(false);

  const handleCheckboxChange = async (playlistId, isChecked) => {
    setCheckedPlaylists((prev) => ({
      ...prev,
      [playlistId]: isChecked,
    }));

    try {
      if (isChecked) {
        await addToPlaylist({
          playlistId: playlistId,
          trackId: trackId,
        });
      } else {
        console.log("Some error occured");
      }
    } catch (error) {
      console.error("Error adding/removing track to/from playlist:", error);
    }
  };

  useEffect(() => {
    refetch();
  }, [refresh]);

  useEffect(() => {
    if (isSaved) {
      toast.success("Track Saved Successfully ");
      setRefresh((prev) => !prev);
    }
  }, [isSaved]);

  useEffect(() => {
    if (isError) {
      if (error?.message) {
        toast.error(error?.message);
      } else if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Cant Save");
      }
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-slate-800 px-8 py-10 md:min-w-96">
      <div>
        <p className="font-bold text-2xl">👋 Save to</p>
      </div>
      <div>
        <div className="mt-12">
          <SaveToFavourites trackId={trackId} />
          {getUserPlaylists?.map((playlist, i) => {
            const isChecked =
              playlist?.containsTrack ||
              checkedPlaylists[playlist?._id] ||
              false;

            return (
              <div key={i} className="flex mb-5 justify-between">
                <Checkbox
                  title={playlist?.name}
                  setChecked={(checked) =>
                    handleCheckboxChange(playlist?._id, checked)
                  }
                  checked={isChecked}
                />
                <div>
                  <FontAwesomeIcon icon={faShieldAlt} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavedPlaylists;
