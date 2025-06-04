export type Movies = {
  Search: Search[];
  totalResults: string;
  Response: "True";
};

export type Search = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type NoResponse = {
  Response: "False";
  Error: string;
};

export type MovieResponse = Movies | NoResponse;
