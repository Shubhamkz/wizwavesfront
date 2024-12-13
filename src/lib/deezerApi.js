export const searchSongs = async (keyword) => {
  const res = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${keyword}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    }
  );
  const data = await res.json();

  return data;
};
