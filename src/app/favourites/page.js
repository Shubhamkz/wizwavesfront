import Favourites from "@/components/FavouriteSongs/Favourites";
import MainSidebar from "@/components/Sidebar/MainSidebar";
import React from "react";

const page = () => {
  return (
    <main className="grid grid-cols-12 min-h-[100vh] bg-slate-950 text-white">
      <MainSidebar content="Favourites" />
      <div className="col-span-12 md:col-span-9">
        <Favourites />
      </div>
    </main>
  );
};

export default page;
