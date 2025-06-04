import { styled, Typography } from "@mui/material";
import { Card, CardContent, CardMedia } from "@mui/material";

export type MovieType = {
    title: string;
    description: string;
    img: string;
}

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': { 
    paddingBottom: 16,
  },
});

function MovieCard(props: MovieType) {
    return (
        <SyledCard>
            <CardMedia
              component="img"
              alt="green iguana"
              image={props.img}
              onError={(e) => (e.currentTarget.src = "/movie.jpg")}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <SyledCardContent>
                <Typography variant="h5" gutterBottom>
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
            </SyledCardContent>
        </SyledCard>
    );
}

export default MovieCard;