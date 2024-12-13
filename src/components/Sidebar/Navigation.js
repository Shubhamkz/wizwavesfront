"use client";

import { faArtstation } from "@fortawesome/free-brands-svg-icons";
import {
  faCirclePlay,
  faCompactDisc,
  faEllipsisVertical,
  faHeart,
  faHouse,
  faMagicWandSparkles,
  faMusic,
  faTableCellsLarge,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import NavigationTab from "./NavigationTab";
import {
  useDeletePlaylistMutation,
  useGetUserPlaylistsQuery,
} from "@/redux/features/Playlist/playlistEndpoint";
import CustomModal from "../ui/CustomModal";
import CreatePlaylist from "../Manage/Playlist/CreatePlaylist";
import Loader from "../ui/Loader";
import LoaderTwo from "../ui/LoaderTwo";

const Navigation = ({ content, playlistID }) => {
  const [refresh, setRefresh] = useState(false);
  // const { data: allPlaylists, isLoading, refetch } = useGetAllPlaylistQuery();
  const {
    data: getUserPlaylists,
    isLoading,
    refetch,
  } = useGetUserPlaylistsQuery();
  const [deletePlaylist, { isLoading: isDeleting, isSuccess }] =
    useDeletePlaylistMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleDeletePlaylist = async (playlistId) => {
    await deletePlaylist(playlistId);
  };

  useEffect(() => {
    refetch();
  }, [refresh, isSuccess]);

  const fetchId = playlistID?.["playlsit-detail"]?.split("-")?.at(-1) || "";

  if (isLoading) return <Loader />;

  return (
    <section>
      <div>
        <div className="pt-8">
          <div className="px-12">
            <div className="relative ">
              <h2 className="text-slate-100 font-bold text-xl">
                WizWaves &nbsp;
                <span>
                  <FontAwesomeIcon
                    className="w-[2rem] inline"
                    icon={faMagicWandSparkles}
                  />
                </span>
              </h2>
              <div className="absolute -top-3 -left-8 px-4 py-4 bg-gradient-to-tr from-rose-600 via-red-500  to-red-100 rounded-full w-max"></div>
            </div>
          </div>

          {/* //////////////////////////////  */}
          <div>
            <div className="flex flex-col gap-4 py-8 mt-12">
              <NavigationTab
                label={"Home"}
                icon={faHouse}
                url={"/"}
                isActive={content === "Home"}
              />
              <NavigationTab
                label={"Genres"}
                icon={faTableCellsLarge}
                url={"/genre"}
                isActive={content === "Genres"}
              />
              <NavigationTab label={"Artists"} icon={faArtstation} url={""} />
              <NavigationTab label={"Albums"} icon={faCompactDisc} url={""} />
            </div>
          </div>

          {/* //////////////////////////////  */}

          <div>
            <div className="flex flex-col gap-4 py-8">
              <NavigationTab
                label={"Recently Played"}
                icon={faMusic}
                url={"/recently-played"}
                isActive={content === "Recents"}
              />
              <NavigationTab
                label={"Favourites"}
                icon={faHeart}
                url={"/favourites"}
                isActive={content === "Favourites"}
              />
            </div>
          </div>

          {/* //////////////////////////////  */}

          <div className="mt-2 ">
            <div className="pl-12 pb-2 ">
              <div className="flex justify-between pr-12">
                <div>
                  <p className="text-gray-200 text-xs">Playlists</p>
                </div>
                <CustomModal
                  setIsModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                  modalButton={
                    <div
                      onClick={() => setIsModalOpen(true)}
                      className="border-2 border-sky-500 w-max px-4 -translate-y-1/3 rounded-lg cursor-pointer hover:scale-105 hover:border-sky-600"
                    >
                      <button className="font-extrabold text-sky-500 hover:text-sky-600">
                        +
                      </button>
                    </div>
                  }
                  modalContent={
                    <CreatePlaylist
                      setIsModalOpen={setIsModalOpen}
                      setRefresh={setRefresh}
                    />
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 py-4">
              {getUserPlaylists?.map((playlist, i) => {
                return (
                  <div key={i} className="flex justify-between pr-6">
                    <NavigationTab
                      label={playlist?.name}
                      icon={faCirclePlay}
                      url={`/playlists/playlist-${playlist?._id}`}
                      isActive={fetchId === playlist?._id}
                    />
                    {deleteId === playlist?._id && isDeleting ? (
                      <LoaderTwo />
                    ) : (
                      <div className="px-3 py-1 rounded-md bg-slate-700 hover:scale-105 transition-all duration-300 hover:bg-slate-800">
                        <FontAwesomeIcon
                          onClick={() => {
                            setDeleteId(playlist?._id);
                            handleDeletePlaylist(playlist?._id);
                          }}
                          className="texst-xs cursor-pointer"
                          icon={faTrash}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navigation;
