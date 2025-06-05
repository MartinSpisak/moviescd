import { Box, styled, Typography } from "@mui/material";
import { Card, CardContent, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Favorite from "./Favorite";

export type MovieType = {
  title: string;
  description: string;
  img: string;
  id: string;
};

// Those components are based on MUI example card
const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "auto",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 8,
  "&:last-child": {
    paddingBottom: 4,
  },
});

function MovieCard(props: MovieType) {
  const navigate = useNavigate();
  const navMovie = () => navigate(`/movie/${props.id}`);

  return (
    <SyledCard>
      <CardMedia
        component="img"
        alt={props.title}
        image={props.img}
        onError={(e) => (e.currentTarget.src = "/movie.jpg")}
        sx={{
          height: { md: "100%" },
          aspectRatio: { md: "" },
        }}
        onClick={navMovie}
      />
      <SyledCardContent onClick={navMovie}>
        <Typography variant="h5" gutterBottom overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" title={props.title}>
          {props.title}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
            {props.description}
          </Typography>
          <Favorite id={props.id} />
        </Box>
      </SyledCardContent>
    </SyledCard>
  );
}

export default MovieCard;
