import { useState, useRef, useEffect, useCallback } from "react";

const noop = () => {};

export function useSpotifyWebPlaybackSdk({
  name,
  getOAuthToken,
  accountError = noop,
  onReady = noop,
  onPlayerStateChanged = noop,
}) {
  const [isReady, setIsReady] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const playerRef = useRef(null);

  useEffect(() => {
    console.log("Initializing Spotify SDK...");

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("Spotify SDK is ready, initializing player...");

      playerRef.current = new window.Spotify.Player({
        name,
        getOAuthToken: async (cb) => {
          console.log("Fetching OAuth token...");
          try {
            const token = await getOAuthToken();
            console.log("OAuth token fetched successfully:", token);
            cb(token);
          } catch (error) {
            console.error("Error fetching OAuth token:", error);
          }
        },
      });

      console.log("Player instance created:", playerRef.current);
      setIsReady(true);
    };

    if (!window.Spotify) {
      console.log("Spotify SDK not found, injecting script...");
      const scriptTag = document.createElement("script");
      scriptTag.src = "https://sdk.scdn.co/spotify-player.js";
      scriptTag.onload = () => console.log("Spotify SDK script loaded.");
      document.head.appendChild(scriptTag);
    } else {
      console.log("Spotify SDK already loaded, initializing player...");
      playerRef.current = new window.Spotify.Player({
        name,
        getOAuthToken: async (cb) => {
          console.log("Fetching OAuth token...");
          try {
            const token = await getOAuthToken();
            console.log("OAuth token fetched successfully:", token);
            cb(token);
          } catch (error) {
            console.error("Error fetching OAuth token:", error);
          }
        },
      });

      console.log("Player instance created:", playerRef.current);
      setIsReady(true);
    }
  }, [name, getOAuthToken]);

  const handleReady = useCallback(
    ({ device_id }) => {
      console.log("Player is ready with device ID:", device_id);
      setDeviceId(device_id);
      onReady(device_id);
    },
    [onReady]
  );

  useEffect(() => {
    if (isReady && playerRef.current) {
      console.log("Attempting to connect Spotify Player...");

      playerRef.current
        .connect()
        .then((success) => {
          if (success) {
            console.log("Player successfully connected!");
          } else {
            console.error("Player failed to connect.");
          }
        })
        .catch((error) => {
          console.error("Error during player connection:", error);
        });
    }
  }, [isReady]);

  useEffect(() => {
    const player = playerRef.current;
    if (isReady && player) {
      console.log("Adding event listeners to player...");

      player.addListener("ready", handleReady);
      player.addListener("account_error", (error) => {
        console.error("Account error:", error);
        accountError(error);
      });
      player.addListener("authentication_error", (error) => {
        console.error("Authentication error:", error);
        accountError(error);
      });
      player.addListener("initialization_error", (error) => {
        console.error("Initialization error:", error);
        accountError(error);
      });
      player.addListener("not_ready", (error) => {
        console.error("Player is not ready:", error);
        accountError(error);
      });
      player.addListener("player_state_changed", (state) => {
        console.log("Player state changed:", state);
        onPlayerStateChanged(state);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error("Playback error:", message);
      });

      return () => {
        console.log("Removing event listeners...");
        player.removeListener("ready", handleReady);
        player.removeListener("account_error", accountError);
        player.removeListener("authentication_error", accountError);
        player.removeListener("initialization_error", accountError);
        player.removeListener("not_ready", accountError);
        player.removeListener("player_state_changed", onPlayerStateChanged);
        player.removeListener("playback_error");
      };
    }
  }, [isReady, accountError, handleReady, onPlayerStateChanged]);

  return {
    player: playerRef.current,
    deviceId,
    isReady,
  };
}
