import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Slider, Typography, Tooltip } from "@material-ui/core"; //slider pada pendanaan
import { Select, MenuItem, InputLabel } from "@material-ui/core"; //select pada pemilihan tenor
import { Grid } from "@material-ui/core"; //untuk grid pada bunga, angsuran dan total

import Flat from "../components/Flat";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core"; // untuk pemilihan jenis bunga
import Efektif from "../components/Efektif";
import Anuitas from "../components/Anuitas";

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

const persenMarks = [
  {
    value: 0.1,
    label: "10%",
  },
  {
    value: 0.5,
    label: "50 %",
  },
  {
    value: 1.0,
    label: "100 %",
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

const PersenBunga = withStyles({
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

export default function Home() {
  const classes = useStyles();

  const [dana, setDana] = useState(1000000);
  const [tenor, setTenor] = useState(12);
  const [persenBunga, setPersenBunga] = useState(0.1);
  const [jenisBunga, setJenisBunga] = useState("flat");

  const handleJenisChange = (event) => {
    setJenisBunga(event.target.value);
  };

  const handleDanaChange = (event, value) => {
    event.preventDefault();
    setDana(value);
  };

  const handlePersenChange = (event, value) => {
    event.preventDefault();
    setPersenBunga(value);
  };

  const handleTenorChange = (event) => {
    setTenor(event.target.value);
  };

  // mengubah agar berformat ke mata uang Indonesia
  const formatRp = (nominal) => {
    const price = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    })
      .format(nominal)
      .replace(/(\.|,)00$/g, "");
    return price;
  };

  //perhitungan
  let bunga = Math.round((persenBunga * dana) / tenor);
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

      <Typography gutterBottom>Bunga</Typography>
      <Typography gutterBottom>{persenBunga * 100} %</Typography>
      <PersenBunga
        aria-label="persen slider"
        defaultValue={0.1}
        min={0.1}
        step={0.1}
        max={1.0}
        marks={persenMarks}
        value={persenBunga}
        onChange={handlePersenChange}
      />
      <div className={classes.margin} />

      <Grid container>
        <Grid item xs={6}>
          <InputLabel>Tenor</InputLabel>
          <Select value={tenor} onChange={handleTenorChange}>
            <MenuItem value={12}>12 Bulan</MenuItem>
            <MenuItem value={24}>24 Bulan</MenuItem>
            <MenuItem value={36}>36 Bulan</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Jenis Bunga</FormLabel>
            <RadioGroup
              aria-label="jenis-bunga"
              value={jenisBunga}
              onChange={handleJenisChange}
            >
              <FormControlLabel value="flat" control={<Radio />} label="Flat" />
              <FormControlLabel
                value="efektif"
                control={<Radio />}
                label="Efektif"
              />
              <FormControlLabel
                value="anuitas"
                control={<Radio />}
                label="Anuitas"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <div className={classes.margin} />
      {/* berdasarkan jenis bunga */}
      {(() => {
        switch (jenisBunga) {
          case "flat":
            return (
              <Flat
                totalKembali={totalKembali}
                formatRp={formatRp}
                classes={classes}
                bunga={bunga}
                angsuran={angsuran}
              />
            );
          case "efektif":
            return <Efektif />;
          case "anuitas":
            return <Anuitas />;
          default:
            return <Flat />;
        }
      })()}
    </div>
  );
}
