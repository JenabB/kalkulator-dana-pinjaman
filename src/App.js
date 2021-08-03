import React from "react";
import { makeStyles, AppBar, Typography } from "@material-ui/core";
import Flat from "./components/Flat";

const useStyles = makeStyles((theme) => ({
  appBar: {
    padding: "20px",
    textAlign: "center",
    marginBottom: "50px",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Typography variant="h6" className={classes.title}>
          Kalkulator Dana Pinjaman
        </Typography>
      </AppBar>
      <div className="App">
        <Flat />
      </div>
    </div>
  );
};

export default App;
