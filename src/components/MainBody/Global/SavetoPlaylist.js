"use client";

import { toggleModal } from "@/redux/features/Playlist/saveToPlaylist";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SavetoPlaylist = ({ modalContent }) => {
  const { isModalOpen } = useSelector((state) => state.saveTrack);
  const dispatch = useDispatch();

  return (
    <div>
      {isModalOpen && (
        <div>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => dispatch(toggleModal())}
          ></div>

          {/* Modal */}
          <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-3xl shadow-lg w-max overflow-hidden max-h-[85vh] overflow-y-scroll hide-scrollbar">
            {/* Modal content */}
            {modalContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavetoPlaylist;
