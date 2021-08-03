import React from "react";
import { Grid, Paper } from "@material-ui/core"; //untuk grid pada bunga, angsuran dan total

const Flat = ({ classes, formatRp, bunga, angsuran, totalKembali }) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h5>Bunga</h5>
            <p>{formatRp(bunga)}/bulan</p>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h5>Angsuran</h5>
            <p>{formatRp(angsuran)}/bulan</p>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.totalPaper}>
            Total: {formatRp(totalKembali)}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Flat;
