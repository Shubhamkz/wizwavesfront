export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export function clearUserCookies(cookieName) {
  const cookies = document.cookie.split(";");

  cookies.forEach((cookie) => {
    const [name] = cookie.trim().split("=");
    if (name === cookieName) {
      // Set the cookie expiration date to a past time
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });
}

export function dateTimeAgo(postedDate) {
  const currentDate = new Date();
  const postDate = new Date(postedDate);

  const elapsedMilliseconds = currentDate - postDate;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedMonths = Math.floor(elapsedDays / 30);
  const elapsedYears = Math.floor(elapsedDays / 365);

  if (elapsedSeconds < 60) {
    return `${elapsedSeconds} seconds ago`;
  } else if (elapsedMinutes < 60) {
    return `${elapsedMinutes} minutes ago`;
  } else if (elapsedHours < 24) {
    return `${elapsedHours} hours ago`;
  } else if (elapsedDays < 30) {
    return `${elapsedDays} days ago`;
  } else if (elapsedMonths < 12) {
    return `${elapsedMonths} months ago`;
  } else {
    return `${elapsedYears} years ago`;
  }
}

export async function getAudioDuration(audioUrl) {
  const audio = new Audio(audioUrl);

  return new Promise((resolve, reject) => {
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio?.duration); // Duration in seconds
    });

    audio.addEventListener("error", (err) => {
      reject(`Error loading audio: ${err.message}`);
    });
  });
}

export function getNextTrackById(tracksArray, currentId) {
  if (!currentId) return;
  // Find the index of the object with the given id
  const index = tracksArray?.findIndex((track) => track._id === currentId);

  // Check if the index is valid and if there's a next object
  if (index !== -1 && index < tracksArray?.length - 1) {
    return tracksArray[index + 1]; // Return the next object
  } else {
    return null; // Return null if no next object exists
  }
}

export function setCookie(name, value, days) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieValue;
}
