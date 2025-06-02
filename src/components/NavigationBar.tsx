import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ mr: 2 }} onClick={() => navigate('/home')}>
                        MOVIES
                    </Typography>
                    {/* <Box sx={{ width: '200', flexGrow: 2 }}> */}
                        <Search />
                    {/* </Box> */}
                    <Button color="inherit" onClick={() => navigate('/favorites')}>Favorites</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavigationBar;
