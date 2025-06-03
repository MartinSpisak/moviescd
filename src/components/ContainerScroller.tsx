import { Container, Grid } from "@mui/material";
import MovieCard from "./MovieCard";
import { useQuery } from "@tanstack/react-query";
import { Movies } from "../types/Movies";

const apikey = process.env.REACT_APP_API_KEY;

console.log(apikey);

function ContainerScroller() {
  const { data, isLoading, error } = useQuery<Movies>({
    queryKey: ["movies"],
    queryFn: () => fetch(`https://www.omdbapi.com/?s=Avenger&apikey=${apikey}`).then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
        {data?.Search.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            description={`${movie.Type} - ${movie.Year} - ${movie.imdbID}`}
            img={movie.Poster}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default ContainerScroller;
