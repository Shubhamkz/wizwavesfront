"use client";

import React, { useEffect, useState } from "react";
import Checkbox from "../ui/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import {
  useGetFavouriteStatusQuery,
  useSaveToFavouritesMutation,
} from "@/redux/features/Playlist/playlistEndpoint";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";

const SaveToFavourites = ({ trackId }) => {
  const {
    data: isFavourite,
    isLoading,
    refetch,
  } = useGetFavouriteStatusQuery(trackId);
  const [saveToFavoutite, { isSuccess, isError, error }] =
    useSaveToFavouritesMutation();
  const [refresh, setRefresh] = useState(false);

  const handleSaveToFav = async () => {
    await saveToFavoutite(trackId);
  };

  useEffect(() => {
    refetch();
  }, [refresh]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Added to your favourites");
      setRefresh((prev) => !prev);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error?.message) {
        toast.error(error?.message);
      } else if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error("An error occurred");
      }
    }
  }, [isError]);

  if (isLoading) return <Loader />;

  const isChecked = isFavourite?.isFavorite ? isFavourite?.isFavorite : false;

  return (
    <div className="flex mb-5 justify-between">
      <Checkbox
        title={"Favourites"}
        setChecked={handleSaveToFav}
        checked={isChecked}
      />
      <div>
        <FontAwesomeIcon icon={faShieldAlt} />
      </div>
    </div>
  );
};

export default SaveToFavourites;
