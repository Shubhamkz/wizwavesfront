"use client";

import React from "react";

const Checkbox = ({ title, setChecked, checked }) => {
  return (
    <div className="">
      <label
        hrmlFor="spiral"
        className="relative flex gap-3 cursor-pointer text-[#EC5800]"
      >
        <input
          type="checkbox"
          name="spiral"
          id="spiral"
          checked={checked}
          onChange={setChecked}
          className="peer appearance-none"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="76"
          height="86"
          fill="none"
          viewBox="0 0 76 86"
          className=" h-[2em] w-[2em]  duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
        >
          <path
            stroke="#EC5800"
            pathLength="100"
            strokeWidth="4px"
            d="M65.988 12.645c-4.136-3.922-9.554-6.9-15.047-8.398C45.855 2.86 38.462-.12 33.096 1.797 26.002 4.331 20.525 11.961 15.6 17.193 2.02 31.623-6.386 59.79 12.101 74.58c8.711 6.97 18.19 9.184 29.043 9.798 24.117 1.365 28.693-3.588 32.542-27.643.772-4.83 3.15-16.094.7-20.995-4.678-9.354-22.35-11.08-31.143-7.698-9.911 3.812-18.558 14.775-20.295 25.193-1.45 8.707 5.447 10.548 12.947 10.848 6.772.27 10.148 1.421 10.148-5.949 0-5.412.09-7.166-2.1-11.547"
          ></path>
        </svg>

        <div className="relative">
          <p className="text-[1em] mt-1 font-semibold [user-select:none] text-white">
            {title}
          </p>
          <span className="absolute top-0 -left-12 w-[2em] h-[2em] rounded-[0.25em] border-[2px] border-[#EC5800]"></span>
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
