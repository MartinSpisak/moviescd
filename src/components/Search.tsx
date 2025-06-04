import { alpha, InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchStore } from "../stores/SearchStore";
import { useEffect, useState } from "react";

// MUI example search bar
const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

function Search() {
  const [input, setInput] = useState("");
  const { setSearch } = useSearchStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(input);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, setSearch]);

  return (
    <>
      <SearchBar>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </SearchBar>
    </>
  );
}

export default Search;
