import React, { useRef } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
//import { Calendar } from "./components/Calendar/Calendar";
import "./App.css";
import { Week } from "./components/Calendar/Week/Week";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

function App() {
  const classes = useStyles();

  /*const scrollableWrapper = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollableWrapper.current) {
      scrollableWrapper.current.scrollTo({ left: scrollableWrapper.current.scrollWidth, behavior: 'smooth' });
    }
  };*/

  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Мой планер
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Week />

      {/*<div
        ref={scrollableWrapper}
        style={{ width: "500px", overflow: "hidden", height: "100px" }}
      >
        <div
          style={{ width: "1000px", height: "100%", border: "10px solid red" }}
        >1222222</div>
      </div>
      <button onClick={handleScroll}>scroll</button>*/}
    </div>
  );
}

export default App;
