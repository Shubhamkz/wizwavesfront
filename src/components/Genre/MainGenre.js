"use client";

import { useGetAllTracksQuery } from "@/redux/features/MusicPlayer/trackEndpoints";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faCalendar,
  faSort,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const MainGenre = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("releaseDate");
  const [yearFilter, setYearFilter] = useState("");
  const { data: allTracks, refetch } = useGetAllTracksQuery({
    genre: selectedGenre,
    page,
    year: yearFilter,
  });

  useEffect(() => {
    refetch();
  }, [page, yearFilter, selectedGenre]);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleYearFilterChange = (event) => {
    setYearFilter(event.target.value);
  };

  return (
    <div className="p-5 text-white">
      {/* Genre Tabs */}
      <div className="flex gap-3 mb-6">
        {["All", "Pop", "Rock", "Hip-Hop", "Jazz", "Electronic"].map(
          (genre) => (
            <button
              key={genre}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedGenre === genre
                  ? "bg-red-500"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => handleGenreChange(genre === "All" ? "" : genre)}
            >
              <FontAwesomeIcon icon={faMusic} className="mr-2" /> {genre}
            </button>
          )
        )}
      </div>

      {/* Sorting and Year Filter */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <label>Sort by:</label>
          <select
            value={sort}
            onChange={handleSortChange}
            className="bg-gray-700 text-white px-3 py-2 rounded-md"
          >
            <option value="releaseDate">Release Date</option>
            <option value="popularity">Popularity</option>
          </select>
          <FontAwesomeIcon icon={faSort} />
        </div>
        <div className="flex items-center gap-2">
          <label>Year:</label>
          <input
            type="text"
            placeholder="YYYY"
            value={yearFilter}
            onChange={handleYearFilterChange}
            className="bg-gray-700 text-white px-3 py-2 rounded-md"
          />
          <FontAwesomeIcon icon={faCalendar} />
        </div>
      </div>

      {/* Tracks List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {allTracks?.tracks?.map((track) => (
          <div
            key={track._id}
            className="bg-gray-800 rounded-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <img
              src={track.album?.images?.[0]?.url}
              alt={track.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-3 text-center">
              <h3 className="text-lg font-semibold text-red-500">
                {track.name}
              </h3>
              <p className="text-sm text-gray-400">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Prev
        </button>
        <span className="text-white">Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md"
        >
          Next <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default MainGenre;
