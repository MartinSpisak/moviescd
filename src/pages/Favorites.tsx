import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { Movie } from "../types/Movies";
import { useFavoriteStore } from "../stores/FavoriteStore";
import { useEffect, useState } from "react";
import MovieCollection from "../components/MovieCollection";
import { Typography } from "@mui/material";

const PAGE_SIZE = 10;

function Favorites() {
  const { favorites } = useFavoriteStore();
  const [movies, setMovies] = useState<Movie[]>([]);

  const getFavorites = (pageParam: number) => {
    return favorites.slice((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFavIds, setCurrentFavIds] = useState<string[]>(
    getFavorites(currentPage)
  );

  const result: UseQueryResult<Movie>[] = useQueries({
    queries: currentFavIds.map((id) => ({
      queryKey: ["movie", id],
      queryFn: async () => {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return response.json();
      },
    })),
    combine: (result) => result.map((movie) => movie),
  });

  const isLoading = result.every((movie) => movie.isLoading);
  const error = result.some((movie) => movie.error);
  const allLoaded = result.every((movie) => movie.isFetched);

  useEffect(() => {
    if (allLoaded) {
      setMovies((prev) => [...prev, ...result.map((movie) => movie.data!)]);
      setCurrentPage((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLoaded]);

  const hasNextPage = movies.length < favorites.length;

  if (error)
    return (
      <Typography variant="h6" align="center">
        Error: Some movies could not be loaded
      </Typography>
    );

  return (
    <MovieCollection
      data={movies.map((movie) => ({
        title: movie.Title,
        type: movie.Type,
        year: movie.Year,
        id: movie.imdbID,
        img: movie.Poster,
      }))}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={() => {
        setCurrentFavIds(getFavorites(currentPage));
      }}
    />
  );
}

export default Favorites;
