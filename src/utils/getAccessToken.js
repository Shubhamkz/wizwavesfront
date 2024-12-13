import axios from "axios";

// Set up your credentials
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

// Encode to Base64 for Authorization header
const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64"
);

// Get the access token
export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token; // This is the token you'll use to make API requests
  } catch (error) {
    console.error("Error getting access token:", error.response.data);
  }
};
