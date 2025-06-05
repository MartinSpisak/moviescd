import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Container } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#20213b",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  const location = useLocation();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationBar />
        <Container sx={{ maxWidth: "1200px", margin: "auto" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Details />} />
            <Route
              path="/favorites"
              element={<Favorites key={location.pathname} />}
            />
          </Routes>
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
