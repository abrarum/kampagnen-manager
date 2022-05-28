import React, {  useEffect, useState } from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchKampagnen } from './api/index.jsx';


// Components
import DataTable from "./components/DataTable";
import PopModal from "./components/PopModal";

// Custom css
import "./App.css";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      light: "#45c6ed",
      main: "#00bef7",
      dark: "#00a1f7",
      contrastText: "#fff"
    }
  }
});

export default function HideAppBar(props: Props) {
  const [kampagnen, setKampagnen] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    try {
        fetchKampagnen().then(
            (success) => {
              setKampagnen(success.data.data);
            },
            (reject) => {
                console.log('reject', reject);
            }
        );
    } catch (err) {
        console.log('error', err);
    }
  }, [isUpdate]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div">
                Kampagnenmanager
              </Typography>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
        <Container sx={{ my: 2 }}>
          <div className="dataGridHeader">
            <h2>Alle Kampagnen</h2>
            <PopModal handleKampagnenUpdate={() => setIsUpdate(true)} />
          </div>
          <Paper elevation={1} className="dataTable">
            <DataTable kampagnen={kampagnen} />
          </Paper>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
