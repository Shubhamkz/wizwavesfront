"use client";

import React from "react";
import Search from "./Search";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/redux/features/MusicPlayer/sidebarToggleSlice";
const Account = dynamic(() => import("./Account"), {
  ssr: false,
});

const Header = () => {
  const dispatch = useDispatch();

  return (
    <section className="flex justify-between px-2 md:px-5 py-5">
      <div className="hidden md:block">
        <Search />
      </div>
      <div
        onClick={() => dispatch(toggleSidebar())}
        className="text-white block md:hidden border-[1px] border-slate-50 rounded-md px-2 py-1 h-max w-max cursor-pointer"
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <Account />
    </section>
  );
};

export default Header;
