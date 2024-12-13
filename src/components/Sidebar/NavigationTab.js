"use client";

import { scrollToTop } from "@/utils/Helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

const NavigationTab = ({ label, icon, url, isActive }) => {
  const router = useRouter();

  const handleRoute = () => {
    router.push(url);
    scrollToTop();
  };

  return (
    <div>
      <div
        onClick={handleRoute}
        className={`${
          isActive && "border-l-[6px] border-red-400 -ml-1"
        } flex justify-start items-center gap-4 cursor-pointer`}
      >
        <div className={`${isActive && "pl-10"} pl-12`}>
          <FontAwesomeIcon
            className={`${isActive && " text-red-400"} inline w-[1rem] `}
            icon={icon}
          />
        </div>
        <div className="pt-1">
          <p className={`${isActive && " text-red-400"} text-xs lg:text-sm`}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavigationTab;
