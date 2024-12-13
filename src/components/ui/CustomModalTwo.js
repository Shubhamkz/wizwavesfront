"use client";

import React from "react";

const CustomModalTwo = ({
  buttonContent,
  modalContent,
  displayModal,
  setDisplayModal,
  handlePreview,
  overlay,
}) => {
  const modalToggle = () => {
    setDisplayModal((prev) => !prev);
  };

  return (
    <div>
      {displayModal && (
        <>
          <div
            onClick={() => setDisplayModal(false)}
            className={`${
              overlay ? overlay : "bg-[#0000009c]"
            } top-0 left-0 fixed w-full h-full z-50 `}
          ></div>
          <div className="h-max max-h-[90vh] w-full md:w-max mint-w-[30vw] max-w-[90vw] sm:max-w-[70vw] bg-[#E8F1FF] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 px-6 py-4 rounded-3xl">
            <div
              style={{ overflowY: "scroll" }}
              onScroll={(e) => e.preventDefault()}
              className=" max-h-[87vh]  hide-scrollbar "
            >
              {modalContent}
            </div>
          </div>
        </>
      )}

      <div
        onClick={(e) => {
          handlePreview ? handlePreview(e) : modalToggle();
        }}
      >
        {buttonContent}
      </div>
    </div>
  );
};

export default CustomModalTwo;
