import { Box, Button, Container, Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

export type MovieCollectionType = {
  title: string;
  type: string;
  year: string;
  id: string;
  img: string;
};

function MovieCollection({
  data,
  isLoading,
  hasNextPage,
  loadMore,
}: {
  data: MovieCollectionType[];
  isLoading: boolean;
  hasNextPage: boolean;
  loadMore: () => void;
}) {
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
      <Grid
        container
        spacing={2}
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        justifyContent="center"
        size={{ xs: 12, md: 6 }}
      >
        {data?.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            description={`${movie.year} ${movie.type}`}
            img={movie.img === "N/A" ? "/movie.jpg" : movie.img}
          />
        ))}
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={100}
        gap={2}
      >
        {hasNextPage && !isLoading && (
          <Button
            onClick={() => loadMore()}
            color="primary"
            variant="contained"
          >
            Load More
          </Button>
        )}
        {isLoading && (
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default MovieCollection;
