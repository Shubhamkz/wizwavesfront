"use client";

import React from "react";
import FavouritesCard from "./FavouritesCard";
import { useGetAuthProfileQuery } from "@/redux/features/userAuth/authEndpoints";
import Loader from "../ui/Loader";

const MyFavouties = () => {
  const { data: authData, isLoading } = useGetAuthProfileQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="bg-slate-700 mb-6 rounded-2xl pr-2">
      <div className="flex justify-between px-5 py-4 ">
        <div>
          <h2 className="font-bold">My Favourites</h2>
        </div>
        <div>
          <div>
            <button className="text-red-500 hover:text-rose-500 hover:scale-105 hover:transition-all">
              See all
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1 md:max-h-72 overflow-y-scroll custom-scrollbar">
          {authData?.user?.favorites?.map((favourite, i) => {
            return <FavouritesCard key={i} track={favourite} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MyFavouties;
