import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { Movie } from "../types/Movies";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Favorite from "../components/Favorite";

function Details() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      return data;
    },
  });

  if (isLoading)
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="h6" align="center">
        Error: {error.message}
      </Typography>
    );
  if (!data)
    return (
      <Typography variant="h6" align="center">
        No movie data found
      </Typography>
    );

  return (
    <Paper elevation={3} sx={{ p: 2, marginTop: 2 }}>
      <Grid container spacing={2} >
        <Grid size={{ xs: 12, md: 4 }}>
          <Box component="img" src={data.Poster === "N/A" ? "/movie.jpg" : data.Poster} alt={data.Title} maxWidth={"100%"}/>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" gutterBottom>
            {data.Title}
            <Favorite id={data.imdbID} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.Plot || "No plot available"}
          </Typography>
          <Divider sx={{ my: 1 }} />
          {data.Ratings && data.Ratings.length > 0 && (
            data.Ratings.map((rating) => (
              <Typography variant="body2" color="text.secondary">
                <strong>{rating.Source}: </strong> {rating.Value}
              </Typography>
            ))
          )}
          <Typography variant="body2" color="text.secondary">
            <strong>IMDB Rating: </strong>
            {data.imdbRating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>IMDB Votes: </strong>
            {data.imdbVotes}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>IMDB ID: </strong>
            {data.imdbID}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Type: </strong>
            {data.Type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>DVD: </strong>
            {data.DVD}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Box Office: </strong>
            {data.BoxOffice}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Production: </strong>
            {data.Production}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Country: </strong>
            {data.Country}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Language: </strong>
            {data.Language}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Released: </strong>
            {data.Released}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Rated: </strong>
            {data.Rated}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Writer: </strong>
            {data.Writer}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Year: </strong>
            {data.Year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Director: </strong>
            {data.Director}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Actors: </strong>
            {data.Actors}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Runtime: </strong>
            {data.Runtime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Genre: </strong>
            {data.Genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Website: </strong>
            {data.Website}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Details;
