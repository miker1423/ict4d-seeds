import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { Link, Navigate } from 'react-router-dom';

const Certificates = () => {
  const createData = (
    id: number,
    phoneno: string,
    certificationp: string,
    datecreate: string,
    varpur: string,
    batchno: string,
    germfac: string,
    lastchanged: string,
    seedvar: string,
    certified: boolean
  ) => {
    return {
      id,
      phoneno,
      certificationp,
      datecreate,
      varpur,
      batchno,
      germfac,
      lastchanged,
      seedvar,
      certified
    };
  };

  const rows = [
    createData(
      0,
      '00448767834',
      '2020-2022',
      '20/04/2022',
      '100%',
      '187',
      '97%',
      '24/04/2022',
      'Corn',
      true,
    ),
    createData(
      1,
      '00447799372657',
      'Not applicable',
      '15/04/2022',
      '50%',
      '188',
      '67%',
      '24/04/2022',
      'Artemisia',
      false
    )
  ];

  return (
    <TableContainer id="table-container" sx={{ backgroundColor: 'white' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="right">Phone number</TableCell>
            <TableCell align="right">Seed Variety</TableCell>
            <TableCell align="right">Batch no.</TableCell>
            <TableCell align="right">Germinative Faculty</TableCell>
            <TableCell align="right">Varietal Purity</TableCell>
            <TableCell align="right">Certification period</TableCell>
            <TableCell align="right">Date created</TableCell>
            <TableCell align="right">Last Changed</TableCell>
            <TableCell align="right">Certified</TableCell>
            <TableCell align="right">PDFlinks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 }
              }}
            >
              <TableCell component="th" scope="row">
                {row.phoneno}
              </TableCell>
              <TableCell align="right">{row.seedvar}</TableCell>
              <TableCell align="right">{row.batchno}</TableCell>
              <TableCell align="right">{row.germfac}</TableCell>
              <TableCell align="right">{row.varpur}</TableCell>
              <TableCell align="right">{row.certificationp}</TableCell>
              <TableCell align="right">{row.datecreate}</TableCell>
              <TableCell align="right">{row.lastchanged}</TableCell>
              <TableCell align="right">
                {row.certified ? 'Yes' : 'No'}
              </TableCell>
              <TableCell align="right"><Link id="pdfGen" to="PdfCreator">pog</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Certificates;
