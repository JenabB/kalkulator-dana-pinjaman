import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Slider, Typography, Tooltip } from "@material-ui/core";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    height: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  totalPaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#3f51b5",
    color: "white",
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const marks = [
  {
    value: 1000000,
    label: "1 JT",
  },
  {
    value: 10000000,
    label: "10 JT",
  },
  {
    value: 15000000,
    label: "15 JT",
  },
];

const DanaPinjaman = withStyles({
  root: {
    color: "#3880ff",
    height: 2,
    padding: "15px 0",
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -12,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
})(Slider);

export default function Flat() {
  const classes = useStyles();

  const [dana, setDana] = useState(1000000);
  const [tenor, setTenor] = useState(12);

  const handleDanaChange = (event, value) => {
    event.preventDefault();
    setDana(value);
  };

  const handleTenorChange = (event) => {
    setTenor(event.target.value);
  };

  // mengubah agar berformat ke mata uang Indonesia
  const formatRp = (nominal) => {
    const price = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(nominal);
    return price;
  };

  //perhitungan
  let bunga = Math.round((0.1 * dana) / tenor);
  let cicilanPokok = Math.round(dana / tenor);
  let angsuran = Math.round(cicilanPokok + bunga);
  let totalKembali = Math.round(angsuran * tenor);

  return (
    <div className="main-container">
      <Typography gutterBottom>Dana Pinjaman</Typography>
      <Typography gutterBottom>{formatRp(dana)}</Typography>

      <DanaPinjaman
        aria-label="ios slider"
        defaultValue={1000000}
        min={1000000}
        step={1000000}
        max={15000000}
        marks={marks}
        value={dana}
        onChange={handleDanaChange}
      />
      <div className={classes.margin} />
      <InputLabel>Tenor</InputLabel>
      <Select value={tenor} onChange={handleTenorChange}>
        <MenuItem value={12}>12 Bulan</MenuItem>
        <MenuItem value={24}>24 Bulan</MenuItem>
        <MenuItem value={36}>36 Bulan</MenuItem>
      </Select>
      <div className={classes.margin} />
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
}
