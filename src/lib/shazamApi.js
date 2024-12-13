export const fetchSongDetails = async (trackId) => {
  const res = await fetch(
    `https://shazam.p.rapidapi.com/songs/get-details?key=${trackId}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    }
  );
  const data = await res.json();
  return data;
};

export const fetchTopSongsByCountry = async (countryCode) => {
  try {
    const url = `https://shazam.p.rapidapi.com/search?term=stree&locale=en-US&offset=0&limit=5`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
        "x-rapidapi-host": "shazam.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);

    // Check if response is 204 (No Content) or another empty response
    if (response.status === 204) {
      console.warn("No content available for this country code:", countryCode);
      return []; // Return an empty array or handle as needed
    }

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Check if the response has tracks
    if (!data.tracks || data.tracks.length === 0) {
      throw new Error("No tracks found");
    }

    return data.tracks;
  } catch (error) {
    console.error("Error fetching top songs by country:", error);
    throw error; // Let the thunk handle this
  }
};
