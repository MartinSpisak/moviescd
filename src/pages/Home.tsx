import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { MoviesResponse, Movies } from "../types/Movies";
import { useSearchStore } from "../stores/SearchStore";
import MovieCollection from "../components/MovieCollection";
import { Typography } from "@mui/material";

const PAGE_SIZE = 10;

function Home() {
  const { search } = useSearchStore();

  const request = async ({ pageParam = 1 }: { pageParam: number }) => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&page=${pageParam}&apikey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    return data;
  };

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    MoviesResponse,
    Error,
    InfiniteData<MoviesResponse>,
    ["movies", string],
    number
  >({
    queryKey: ["movies", search],
    queryFn: request,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.Response === "True") {
        return Number(lastPage.totalResults) > PAGE_SIZE * lastPageParam
          ? lastPageParam + 1
          : undefined;
      }
      return undefined;
    },
  });

  if (
    search === "" ||
    search === undefined ||
    search === null ||
    search.length < 3
  ) {
    return (
      <Typography
        variant="h4"
        color="text.secondary"
        align="center"
        sx={{ mt: 4 }}
      >
        Type into search bar to find movies.
      </Typography>
    );
  }
  if (isLoading)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Loading...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Error: {error.message}
      </Typography>
    );
  if (data?.pages[0].Response === "False")
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Error: {data?.pages[0].Error}
      </Typography>
    );

  return (
    <MovieCollection
      data={data?.pages.map((page) => (page as Movies).Search).flat().map((movie) => ({
        title: movie.Title,
        type: movie.Type,
        year: movie.Year,
        id: movie.imdbID,
        img: movie.Poster,
      })) || []}
      isLoading={isFetchingNextPage}
      hasNextPage={hasNextPage}
      loadMore={() => fetchNextPage()}
    />
  );
}

export default Home;
