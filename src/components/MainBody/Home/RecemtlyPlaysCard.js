import React, { useState } from "react";
import Image from "next/image";
import PerformOperation from "./PerformOperation";

const RecemtlyPlaysCard = ({ track, setIsModalOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { name, artists, album } = track || {};
  const playlistBgUrl = album?.images?.[0]?.url;

  return (
    <div className="col-span-4 md:col-span-2 cursor-pointer">
      <div className="flex justify-center items-center flex-col">
        <div className="w-full">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-full h-max rounded-xl mb-1 relative hover:scale-[1.01] hover:shadow-slate-600 hover:shadow-2xl transition-all`}
          >
            <Image
              className="min-w-[4rem] max-w-[4rem] max-h-[3rem] md:max-h-[6rem] min-h-[3rem] md:min-h-[6rem] md:max-w-[10rem] rounded-lg"
              src={playlistBgUrl}
              alt="bg"
              width={500}
              height={500}
            />

            <PerformOperation
              setIsModalOpen={setIsModalOpen}
              setIsHovered={setIsHovered}
              isHovered={isHovered}
              track={track}
            />
          </div>
        </div>

        <div className="mb-1">
          <h2 className="hidden md:block font-bold text-[11px] lg:text-xs">
            {name}
          </h2>
          <h2 className="block md:hidden font-bold text-[11px] lg:text-xs">
            {name?.length > 12 ? `${name.slice(0, 9)}...` : name}
          </h2>
        </div>
        <div>
          <h2 className="text-gray-300 text-[10px] lg:text-11px]">
            {artists?.[0]?.name.length > 15
              ? `${artists?.[0]?.name.slice(0, 15)}...`
              : artists?.[0]?.name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default RecemtlyPlaysCard;
