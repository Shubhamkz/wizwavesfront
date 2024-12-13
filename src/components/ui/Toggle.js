"use client";

import React from "react";

const Toggle = ({ setIsChecked, isChecked }) => {
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label
        className={`relative inline-block h-7 w-[48px] cursor-pointer rounded-full bg-gray-900 transition ${
          isChecked ? "bg-[#1976D2]" : "bg-gray-900"
        }`}
      >
        <input
          type="checkbox"
          id="AcceptConditions"
          className="peer sr-only"
          checked={isChecked}
          onChange={handleToggle} // Call handleToggle when the checkbox changes
        />
        <span
          className={`absolute inset-y-0 start-0 m-1 size-5 rounded-full bg-gray-300 ring-[5px] ring-inset ring-white transition-all peer-checked:start-7 ${
            isChecked ? "start-7 w-2 bg-white ring-transparent" : "bg-gray-900"
          }`}
        ></span>
      </label>
    </div>
  );
};

export default Toggle;
