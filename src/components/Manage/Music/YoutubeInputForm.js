"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageKit from "imagekit";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setForceAudio } from "@/redux/features/MusicPlayer/musicUploadSlice";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC,
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL,
});

const YoutubeInputForm = ({
  audioUrl,
  setAudioUrl,
  isStartConverting,
  setYoutubeLink,
  youtubeLink,
  setIsStartConverting,
  handleUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [test, setTest] = useState("");

  const handleYoutubeLinkChange = (e) => {
    setYoutubeLink(e.target.value);
  };

  const handleAudioUrl = (link) => {
    if (link) {
      handleUpdate(link);
      setAudioUrl(link);
      dispatch(setForceAudio(link));
      setIsStartConverting(false);
    }
  };

  useEffect(() => {
    if (audioUrl) {
      console.log("Audio URL updated:", audioUrl);
    }
  }, [audioUrl]);

  const handleUpload = async () => {
    if (!youtubeLink) {
      toast.error("Please enter a valid YouTube link");
      return;
    }

    setLoading(true); // Show loading while processing

    try {
      // Call the API to convert the YouTube video to MP3
      const response = await convertYoutubeToMp3(youtubeLink);

      if (response.status === 200) {
        const blob = response.data;

        // Upload the Blob to ImageKit
        const uploadedUrl = await uploadToImageKit(blob);
        if (uploadedUrl) {
          handleAudioUrl(uploadedUrl);
          toast.success(
            "Audio uploaded to ImageKit successfully! You can now play the audio."
          );
        } else {
          setIsStartConverting(false);
          toast.error("Failed to upload to ImageKit.");
        }
      } else {
        setIsStartConverting(false);
        toast.error("Failed to convert the video.");
      }
    } catch (error) {
      setIsStartConverting(false);
      console.error("Error while converting/uploading:", error);
      toast.error("An error occurred while converting/uploading the video.");
    } finally {
      setLoading(false); // Stop loading after the process is done
    }
  };

  // Function to call the external API to convert the YouTube link to MP3
  const convertYoutubeToMp3 = async (youtubeLink) => {
    return axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/convert?url=${youtubeLink}`,
      {
        responseType: "blob", // Download the MP3 file as a Blob
      }
    );
  };

  // Function to upload the Blob to ImageKit
  const uploadToImageKit = async (blob) => {
    try {
      const file = new File([blob], "converted-audio.mp3", {
        type: "audio/mp3",
      });

      const response = await imagekit.upload({
        file, // The Blob/File object to upload
        fileName: "converted-audio.mp3", // Name of the file to be uploaded
        folder: "/audios", // Folder in ImageKit (optional)
      });

      if (response?.url) {
        setTest(response.url);
      }

      return response.url; // Return the URL of the uploaded file
    } catch (error) {
      console.error("Error uploading to ImageKit:", error);
      return null;
    }
  };

  useEffect(() => {
    if (isStartConverting) {
      toast.success("Convertng video to audio is under process.");
      handleUpload();
    }
  }, [isStartConverting]);

  return (
    <div>
      <div>
        <div className="mb-5">
          <label className="block text-white mb-2 text-xs">YouTube Link</label>
          <input
            type="text"
            value={youtubeLink}
            onChange={handleYoutubeLinkChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Enter YouTube video link"
          />
        </div>
        {loading && "Loading..."}
      </div>
    </div>
  );
};

export default YoutubeInputForm;
