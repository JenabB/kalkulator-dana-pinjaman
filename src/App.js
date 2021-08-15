import React from "react";
import { makeStyles, AppBar, Typography } from "@material-ui/core";
import { GlobalProvider } from "./context/GlobalState";
import Home from "./pages/Home";

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
    <GlobalProvider>
      <AppBar position="static" className={classes.appBar}>
        <Typography variant="h6" className={classes.title}>
          Kalkulator Dana Pinjaman
        </Typography>
      </AppBar>
      <div className="App">
        <Home />
      </div>
    </GlobalProvider>
  );
};

export default App;
