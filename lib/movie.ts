'use server';

import { getRequiredEnv } from "@/lib/env";

export async function getMovieDetails(imdbId: string) {
  const normalizedImdbId = imdbId.trim();
  if (!normalizedImdbId) {
    return null;
  }

  const omdbApiKey = getRequiredEnv("OMDB_API_KEY");
  const queryParams = new URLSearchParams({
    i: normalizedImdbId,
    apikey: omdbApiKey,
    plot: "full",
  });
  const url = `https://www.omdbapi.com/?${queryParams.toString()}`;

  try {
    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`OMDb Server rejected request. Status: ${res.status}`);
      throw new Error(`Failed to fetch movie (Status: ${res.status})`);
    }

    const data = await res.json();

    if (data.Response === "False") {
      return null;
    }

    return {
      title: data.Title || "Title Unknown",
      poster: data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/400x600?text=No+Poster",
      year: data.Year || "N/A",
      rating: data.imdbRating || "0",
      plot: data.Plot || "No description available for this movie.",
      cast: data.Actors || "N/A",
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}
