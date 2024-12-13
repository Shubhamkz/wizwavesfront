"use client";

import {
  faHeadphones,
  faMusic,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const FileUpload = ({ onFileUpload, setSelectedFile, selectedFile }) => {
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection via input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileUpload(file); // Trigger the upload function
    }
  };

  // Handle drag & drop functionality
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      onFileUpload(file); // Trigger the upload function
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div
          className={`w-full border-dashed rounded-2xl border-[2px] border-slate-400 px-4 py-2 relative ${
            dragActive ? "border-blue-500" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          <div className="flex justify-center items-center py-3">
            <FontAwesomeIcon
              className="text-8xl text-white"
              icon={faHeadphones}
            />
          </div>
          <div className="px-4">
            <p className="text-sm text-center">
              {selectedFile ? (
                <span>Selected: {selectedFile.name}</span>
              ) : (
                <>
                  Click or Drag & Drop your{" "}
                  <span className="">
                    Music <FontAwesomeIcon icon={faMusic} />
                  </span>{" "}
                  to{" "}
                  <span className="px-1">
                    Upload <FontAwesomeIcon icon={faUpload} />
                  </span>{" "}
                  your file
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
