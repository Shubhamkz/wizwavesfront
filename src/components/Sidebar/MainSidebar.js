"use client";

import React, { useEffect } from "react";
import Navigation from "./Navigation";
import { useGetAuthProfileQuery } from "@/redux/features/userAuth/authEndpoints";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpen,
  toggleSidebar,
} from "@/redux/features/MusicPlayer/sidebarToggleSlice";

const AccountNavigation = dynamic(() => import("./AccountNavigation"), {
  ssr: false,
});

const MainSidebar = ({ content, playlistID }) => {
  const { data: currentUser, isLoading } = useGetAuthProfileQuery();
  const isOpen = useSelector((state) => state.sidebarIsOpen.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest("#sidebar")) {
        dispatch(setIsOpen(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (isLoading) return null;

  return (
    <>
      {/* Overlay for closing the sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        ></div>
      )}

      {/* Sidebar Section with Slide-in Animation on Mobile and Col-span-3 on Desktop */}
      <section
        id="sidebar"
        className={`bg-gray-900 md:col-span-3 md:block fixed md:relative z-20 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-4/5 md:w-auto h-full`}
      >
        {content === "Home" && <Navigation content={content} />}
        {content === "Genres" && <Navigation content={content} />}
        {content === "Favourites" && <Navigation content={content} />}
        {content === "Recents" && <Navigation content={content} />}
        {content === "Playlist" && (
          <Navigation content={content} playlistID={playlistID} />
        )}
        {content === "Account" && (
          <AccountNavigation content={content} currentUser={currentUser} />
        )}
        {content === "Music" && (
          <AccountNavigation content={content} currentUser={currentUser} />
        )}
        {content === "Users" && (
          <AccountNavigation content={content} currentUser={currentUser} />
        )}
      </section>
    </>
  );
};

export default MainSidebar;
