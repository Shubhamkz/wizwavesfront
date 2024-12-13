"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  setPlaylistDescription,
  setPlaylistName,
} from "@/redux/features/Playlist/playlistSlice";
import { useCreatePlaylistMutation } from "@/redux/features/Playlist/playlistEndpoint";

const CreatePlaylist = ({ setIsModalOpen, setRefresh }) => {
  const dispatch = useDispatch();
  const { playlistName, playlistDescription } = useSelector(
    (state) => state.createPlaylist
  );
  const [createPlaylist, { isSuccess }] = useCreatePlaylistMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!playlistName || !playlistDescription) {
      toast.error("All fields are required.");
      setIsSubmitting(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) return;

    try {
      await createPlaylist({
        name: playlistName,
        description: playlistDescription,
      });
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error creating playlist", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // Simulating successful submission
      toast.success("Playlist created successfully!");
      setIsModalOpen(false);
      setIsSubmitting(false);
      setRefresh((prev) => !prev);
    }
  }, [isSuccess]);

  return (
    <div className="bg-gray-800 md:px-20 md:py-12 rounded-3xl shadow-lg mb-6 w-max md:min-w-[50vw]">
      <div className="mb-6">
        <h2 className="font-extrabold text-2xl">Create Playlist</h2>
        <p className="font-normal text-sm text-slate-100">
          Enter a name and description for your playlist.
        </p>
      </div>
      <div>
        <div className="mb-4">
          <label className="block text-white mb-2 text-xs">Playlist Name</label>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => dispatch(setPlaylistName(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2 text-xs">Description</label>
          <textarea
            value={playlistDescription}
            onChange={(e) => dispatch(setPlaylistDescription(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500"
        >
          {isSubmitting ? "Creating Playlist..." : "Create Playlist"}
        </button>
      </div>
    </div>
  );
};

export default CreatePlaylist;
