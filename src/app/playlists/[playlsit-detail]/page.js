import PlaylistDetails from "@/components/PlaylistDetails/PlaylistDetails";
import MainSidebar from "@/components/Sidebar/MainSidebar";
import React from "react";

const page = ({ params }) => {
  return (
    <main className="grid grid-cols-12 min-h-[100vh] bg-slate-950 text-white">
      <MainSidebar content="Playlist" playlistID={params} />
      <PlaylistDetails playlistID={params} />
    </main>
  );
};

export default page;
