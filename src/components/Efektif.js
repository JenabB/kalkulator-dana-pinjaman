import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Efektif({ dana, tenor, persenBunga }) {
  const classes = useStyles();
  const [result, setResult] = useState([]);

  const [step, setStep] = useState(1);
  const [saldoPokok, setSaldoPokok] = useState(360000000);
  const [angsuran, setAngsuran] = useState(0);
  const [bunga, setBunga] = useState(0);
  const [totalAngsuranBulan, setTotalAngsuranBulan] = useState(0); //angsuran + bunga

  function createData(
    bulan,
    tenor,
    saldoPokok,
    angsuran,
    bunga,
    totalAngsuranBulan
  ) {
    return {
      bulan,
      tenor,
      saldoPokok,
      angsuran,
      bunga,
      totalAngsuranBulan,
    };
  }

  useEffect(() => {
    if (step <= tenor) {
      setResult([
        ...result,
        {
          bulan: step,
          tenor: tenor,
          saldoPokok: saldoPokok,
          angsuran: angsuran,
          bunga: bunga,
          totalAngsuranBulan: totalAngsuranBulan,
        },
      ]);

      if (step !== tenor) {
        setStep(step + 1);
        let jA = saldoPokok / tenor;
        setAngsuran(jA);
        let pB = saldoPokok * persenBunga * (30 / 360);
        setBunga(pB);
        let tAB = jA + pB;
        setTotalAngsuranBulan(tAB);
      } else {
        setStep(99);
      }
    }
  });

  const rows = result.map((n) =>
    createData(
      n.bulan,
      n.tenor,
      n.saldoPokok,
      n.angsuran,
      n.bunga,
      n.totalAngsuranBulan
    )
  );
  // [
  //   createData("Frozen yoghurt", 159, 6.0, 24),
  //   createData("Ice cream sandwich", 237, 9.0, 37),
  //   createData("Eclair", 262, 16.0, 24),
  //   createData("Cupcake", 305, 3.7, 67),
  //   createData("Gingerbread", 356, 16.0, 49),
  // ];

  console.log("result", result);
  console.log("row", rows);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Bulan ke-</StyledTableCell>
            <StyledTableCell align="right">Tenor</StyledTableCell>
            <StyledTableCell align="right">Saldo Pokok</StyledTableCell>
            <StyledTableCell align="right">Angsuran</StyledTableCell>
            <StyledTableCell align="right">Bunga</StyledTableCell>
            <StyledTableCell align="right">Total Angsuran</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.bulan}>
              <StyledTableCell component="th" scope="row">
                {row.bulan}
              </StyledTableCell>
              <StyledTableCell align="right">{row.tenor}</StyledTableCell>
              <StyledTableCell align="right">{row.saldoPokok}</StyledTableCell>
              <StyledTableCell align="right">{row.angsuran}</StyledTableCell>
              <StyledTableCell align="right">{row.bunga}</StyledTableCell>
              <StyledTableCell align="right">
                {row.totalAngsuranBulan}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
