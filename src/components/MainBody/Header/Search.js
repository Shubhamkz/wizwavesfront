"use client";

import {
  useAddToRecentlyPlayedMutation,
  useSearchTrackQuery,
  useUpdateCountMutation,
} from "@/redux/features/MusicPlayer/trackEndpoints";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { activatePlayer } from "@/redux/features/MusicPlayer/trackPlayerSlice";

const Search = () => {
  const [query, setQuery] = useState(""); // Search query
  const [filteredSongs, setFilteredSongs] = useState([]); // State to store the filtered songs
  const {
    data: searchResults,
    refetch,
    isFetching,
  } = useSearchTrackQuery(query); // API hook
  const dispatch = useDispatch();
  const [addToRecents] = useAddToRecentlyPlayedMutation();
  const [updateCount] = useUpdateCountMutation();

  // Re-fetch the search results when the query changes
  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query, refetch]);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value); // Set the query which will trigger the API search
  };

  // Update filteredSongs when the API returns results
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      // Assuming searchResults is an array of tracks
      const results = searchResults.filter(
        (track) =>
          track.name.toLowerCase().includes(query.toLowerCase()) ||
          track.artists.some((artist) =>
            artist.name.toLowerCase().includes(query.toLowerCase())
          )
      );
      setFilteredSongs(results);
    } else {
      setFilteredSongs([]); // Clear the filteredSongs if no results or query is empty
    }
  }, [searchResults, query]);

  const handleTrackPlay = async (song) => {
    await addToRecents(song?._id);
    await updateCount(song?._id);
    dispatch(
      activatePlayer({
        title: song?.name,
        artist: song?.artists?.[0]?.name,
        albumArt: song?.album?.images?.[0]?.url,
        src: song?.preview_url,
      })
    );
    setQuery("");
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          className="text-xs text-gray-200 pl-12 px-8 py-4 bg-gray-800 outline-none lg:min-w-[25vw] rounded-3xl transition-all focus:scale-105 focus:shadow-xl focus:shadow-slate-700"
          placeholder="Search album, tracks, artists"
          value={query}
          onChange={handleSearch}
        />
        <span className="absolute top-1/2 left-4 -translate-y-1/2 ">
          <FontAwesomeIcon className="text-gray-400 w-[1rem]" icon={faSearch} />
        </span>
      </div>
      {query && filteredSongs?.length >= 1 && (
        <div className="mt-4 absolute top-20 left-4 md:min-w-[40rem] z-40 bg-gray-700 px-4 py-4 rounded-xl">
          <TransitionGroup>
            {filteredSongs.slice(0, 6).map((song) => (
              <CSSTransition key={song.id} timeout={300} classNames="fade">
                <div
                  onClick={() => handleTrackPlay(song)}
                  className="flex items-center justify-between px-4 py-2 bg-gray-900 rounded-lg mb-2 transition-transform hover:scale-105 cursor-pointer hover:bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800"
                >
                  <div className="flex items-center space-x-4">
                    {/* Album Art */}

                    <Image
                      className="w-12 h-12 rounded-full"
                      src={song.album.images[0].url}
                      alt={"Album Art"}
                      height={600}
                      width={600}
                    />

                    {/* Track Name and Artist */}
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-2">
                        {song.name}
                      </h3>
                      <p className="text-gray-400 text-xs">
                        {song.artists.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-gray-400 w-5"
                  />
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      )}
    </div>
  );
};

export default Search;
