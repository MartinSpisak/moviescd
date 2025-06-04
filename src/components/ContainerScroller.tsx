import { Box, Button, Container, Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import {
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { MovieResponse, Movies } from "../types/Movies";
import { useSearchStore } from "../stores/SearchStore";

const apikey = process.env.REACT_APP_API_KEY;

function ContainerScroller() {

  const { search } = useSearchStore();
  console.log(search);
  const request = async ({ pageParam = 1 }: { pageParam: number }) => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&page=${pageParam}&apikey=${apikey}`
    );
    const data = await response.json();
    return data;
  };

  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<MovieResponse, Error, InfiniteData<MovieResponse>, ["movies", string], number>({
      queryKey: ["movies", search],
      queryFn: request,
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.Response === "True") {
          return Number(lastPage.totalResults) > lastPage.Search?.length * lastPageParam
            ? lastPageParam + 1
            : undefined;
        }
        return undefined;
      },
    });

  if (search === "" || search === undefined || search === null || search.length < 3) {
    return <div>Search for a movie</div>;
  }
  if (isLoading) return <div><Typography variant="h6">Loading...</Typography></div>;
  if (error) return <div><Typography variant="h6">Error: {error.message}</Typography></div>;
  if (data?.pages[0].Response === "False") return <div><Typography variant="h6">Error: {data?.pages[0].Error}</Typography></div>;

  return (
    <Container
      disableGutters
      sx={{
        maxWidth: "lg",
        overflowX: "scroll",
        scrollbarWidth: "none",
        mt: 4,
        paddingBottom: 10,
      }}
    >
      <Grid container spacing={2}>
        {data?.pages.map((page) => (page as Movies).Search).flat().map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title || ""}
            description={`${movie.Year || ""} ${movie.Type || ""}`}
            img={movie.Poster === "N/A" ? "/movie.jpg" : movie.Poster}
          />
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={100} gap={2}>
      {hasNextPage && !isFetchingNextPage && (
        <Button onClick={() => fetchNextPage()} color="primary" variant="contained">Load More</Button>
      )}
      {isFetchingNextPage && <Typography variant="h6">Loading...</Typography>}
      </Box>
    </Container>
  );
}

export default ContainerScroller;
