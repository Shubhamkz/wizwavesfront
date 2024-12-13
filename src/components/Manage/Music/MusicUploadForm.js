"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faUpload } from "@fortawesome/free-solid-svg-icons";
import FileUpload from "@/components/ui/FileUpload";
import {
  setTrackName,
  setArtists,
  setDescription,
  setMusicImage,
  setSelectedFile,
  setReleaseDate,
  setGenre,
} from "@/redux/features/MusicPlayer/musicUploadSlice";
import ImageKit from "imagekit";
import {
  useUpdateTrackMutation,
  useUploadTrackMutation,
} from "@/redux/features/MusicPlayer/trackEndpoints";
import toast from "react-hot-toast";
import Toggle from "@/components/ui/Toggle";
import YoutubeInputForm from "./YoutubeInputForm";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC,
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL,
});

const MusicUploadForm = ({ setIsModalOpen, setIsUpdate }) => {
  const dispatch = useDispatch();
  const {
    trackName,
    artists,
    description,
    musicImage,
    selectedFile,
    forceAudio,
    realeaseDate,
    genre,
  } = useSelector((state) => state.trackData);
  const [uploadTrack, { isLoading, isSuccess }] = useUploadTrackMutation();
  const [updateTrack, { isLoading: isUpdating, isSuccess: isUpdated }] =
    useUpdateTrackMutation();
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isStartConverting, setIsStartConverting] = useState(false);
  const [trackId, setTrackId] = useState("");

  const handleFileUpload = (file) => {
    dispatch(setSelectedFile(file));
  };

  const handleImageChange = (e) => {
    dispatch(setMusicImage(e.target.files[0]));
  };

  const validateForm = () => {
    if (!trackName || !artists || !description || !musicImage) {
      toast.error("All fields are required.");
      setIsSubmitting(false);
      return false;
    }

    if (isChecked) {
      if (!youtubeLink) {
        toast.error("All fields are required.");
        setIsSubmitting(false);
        return false;
      }
    }

    if (!isChecked) {
      if (!selectedFile) {
        alert("All fields are required.");
        setIsSubmitting(false);
        return false;
      }
    }
    // Add more custom validation logic if needed
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (!validateForm()) return;

    try {
      // Upload musicImage to ImageKit
      const musicImageUpload = await imagekit.upload({
        file: musicImage, // this is the actual image file
        fileName: musicImage.name,
      });

      let selectedFileUrl;

      if (!isChecked) {
        const selectedFileUpload = await imagekit.upload({
          file: selectedFile, // this is the actual music file
          fileName: selectedFile.name,
        });

        selectedFileUrl = selectedFileUpload.url;
      }

      const musicImageUrl = musicImageUpload.url;

      const res = await uploadTrack({
        name: trackName,
        artists: [{ name: artists }],
        album: {
          images: [
            {
              url: musicImageUrl,
            },
          ],
        },
        preview_url: isChecked ? audioUrl : selectedFileUrl,
        description,
      });

      if (res?.data) {
        setIsStartConverting(true);
        setTrackId(res?.data?._id);
      }
    } catch (error) {
      setIsSubmitting(false);

      console.error("Error uploading files to ImageKit", error);
    }
  };

  const handleUpdate = async (urlParam) => {
    let selectedFileUrl;

    if (!isChecked) {
      const selectedFileUpload = await imagekit.upload({
        file: selectedFile, // this is the actual music file
        fileName: selectedFile.name,
      });

      selectedFileUrl = selectedFileUpload.url;
    }

    try {
      await updateTrack({
        formData: {
          preview_url: isChecked ? urlParam : selectedFileUrl,
        },
        trackId: trackId,
      });
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error uploading files to ImageKit", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Track Uploaded Succesfully");
      setIsModalOpen(false);
      setIsSubmitting(false);
      setIsUpdate((prev) => !prev);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isUpdating) {
      toast.success("Audio Conversion is done you can start playing");
    }
  }, [isUpdating]);

  return (
    <div className="bg-gray-800 md:px-20 md:py-12 rounded-3xl shadow-lg mb-6 w-max md:min-w-[50vw]">
      <div className="mb-6">
        <h2 className="font-extrabold text-2xl">Track Upload</h2>
        <p className="font-normal text-sm text-slate-100">
          Upload track data with its name and image
        </p>
      </div>
      <div>
        <div className="mb-4">
          <label className="block text-white mb-2 text-xs">Track Name</label>
          <input
            type="text"
            value={trackName}
            onChange={(e) => dispatch(setTrackName(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2 text-xs">Release Date</label>
          <input
            type="date"
            value={realeaseDate}
            onChange={(e) => dispatch(setReleaseDate(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2 text-xs">Music Genres</label>
          <select
            type="text"
            value={genre}
            onChange={(e) => dispatch(setGenre(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          >
            <option value="">--Select Genre--</option>
            <option value="trap">Trap</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="hip-hop">Hip-Hop</option>
            <option value="rap">Rap</option>
            <option value="jazz">Jazz</option>
            <option value="classical">Classical</option>
            <option value="country">Country</option>
            <option value="blues">Blues</option>
            <option value="electronic">Electronic</option>
            <option value="dance">Dance</option>
            <option value="reggae">Reggae</option>
            <option value="metal">Metal</option>
            <option value="alternative">Alternative</option>
            <option value="indie">Indie</option>
            <option value="folk">Folk</option>
            <option value="punk">Punk</option>
            <option value="r&b">R&B</option>
            <option value="soul">Soul</option>
            <option value="latin">Latin</option>
            <option value="funk">Funk</option>
            <option value="disco">Disco</option>
            <option value="world">World</option>
            <option value="ambient">Ambient</option>
            <option value="house">House</option>
            <option value="techno">Techno</option>
            <option value="trance">Trance</option>
            <option value="grime">Grime</option>
            <option value="dubstep">Dubstep</option>
            <option value="gospel">Gospel</option>
            <option value="opera">Opera</option>
            <option value="k-pop">K-Pop</option>
            <option value="j-pop">J-Pop</option>
            <option value="c-pop">C-Pop</option>
            <option value="romantic">Romantic</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2 text-xs">Artists</label>
          <input
            type="text"
            value={artists}
            onChange={(e) => dispatch(setArtists(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2 text-xs">Description</label>
          <textarea
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div className="flex gap-2 mb-2">
          <Toggle setIsChecked={setIsChecked} isChecked={isChecked} />
          <div>
            <p>Upload Your Link ?</p>
          </div>
        </div>

        {isChecked ? (
          <YoutubeInputForm
            setAudioUrl={setAudioUrl}
            audioUrl={audioUrl}
            isStartConverting={isStartConverting}
            setYoutubeLink={setYoutubeLink}
            youtubeLink={youtubeLink}
            setIsStartConverting={setIsStartConverting}
            handleUpdate={handleUpdate}
          />
        ) : (
          <FileUpload
            onFileUpload={handleFileUpload}
            setSelectedFile={(file) => dispatch(setSelectedFile(file))}
            selectedFile={selectedFile}
          />
        )}

        <div className="mb-4">
          <label className="block text-white mb-2 text-xs">Music Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <FontAwesomeIcon icon={faImage} className="text-white ml-2" />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500"
        >
          <FontAwesomeIcon icon={faUpload} className="mr-2" />
          {isLoading || isSubmiting ? "Please Wait..." : "Upload Music"}
        </button>
      </div>
    </div>
  );
};

export default MusicUploadForm;
