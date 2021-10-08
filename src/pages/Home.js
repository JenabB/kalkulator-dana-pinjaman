import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStyles, DanaPinjaman, PersenBunga } from "../utils/componentStyles";
import { Typography, Tooltip } from "@material-ui/core"; //slider pada pendanaan
import { Select, MenuItem, InputLabel } from "@material-ui/core"; //select pada pemilihan tenor
import { Grid } from "@material-ui/core"; //untuk grid pada bunga, angsuran dan total
import { rangeDanaPinjaman, rangePersenBunga } from "../utils/range";
import Flat from "../components/Flat";

import { formatRp } from "../utils/formatRp";

import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core"; // untuk pemilihan jenis bunga
import Efektif from "../components/Efektif";
import Anuitas from "../components/Anuitas";

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
        marks={rangeDanaPinjaman}
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
        marks={rangePersenBunga}
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
            return (
              <Efektif dana={dana} tenor={tenor} persenBunga={persenBunga} />
            );
          case "anuitas":
            return <Anuitas />;
          default:
            return <Flat />;
        }
      })()}
    </div>
  );
}
