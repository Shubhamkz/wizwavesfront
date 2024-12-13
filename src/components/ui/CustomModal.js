"use client";

import React from "react";

const CustomModal = ({
  setIsModalOpen,
  isModalOpen,
  modalContent,
  modalButton,
}) => {
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Modal and Overlay */}
      {isModalOpen && (
        <div>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleModal} // Click on overlay to close modal
          ></div>

          {/* Modal */}
          <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-3xl shadow-lg w-max overflow-hidden max-h-[85vh] overflow-y-scroll hide-scrollbar">
            {/* Modal content */}
            {modalContent}
          </div>
        </div>
      )}

      {/* Button to Open Modal */}
      {modalButton}
    </>
  );
};

export default CustomModal;
