import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container sx={{ maxWidth: "1200px", marginRight: "auto" }}>
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{ mr: 2 }}
                onClick={() => navigate("/")}
              >
                Movies
              </Typography>
              <Search />
            </Box>
            <Button color="inherit" onClick={() => navigate("/favorites")}>
              Favorites
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default NavigationBar;
