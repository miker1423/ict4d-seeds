import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ICertificate from '../interfaces/ICertificate';

// const createData = (
//   id: number,
//   phoneno: string,
//   certificationp: string,
//   datecreate: string,
//   varpur: string,
//   batchno: string,
//   germfac: string,
//   lastchanged: string,
//   seedvar: string,
//   certified: boolean
// ) => {
//   return {
//     id,
//     phoneno,
//     certificationp,
//     datecreate,
//     varpur,
//     batchno,
//     germfac,
//     lastchanged,
//     seedvar,
//     certified
//   };
// };

// const row = [
//   createData(
//     0,
//     '00448767834',
//     '2020-2022',
//     '20/04/2022',
//     '100%',
//     '187',
//     '97%',
//     '24/04/2022',
//     'Corn',
//     true
//   ),
//   createData(
//     1,
//     '00447799372657',
//     'Not applicable',
//     '15/04/2022',
//     '50%',
//     '188',
//     '67%',
//     '24/04/2022',
//     'Artemisia',
//     false
//   )
// ];

const Certificates = ({ certList }: { certList: ICertificate[] }) => {
  const [certificates, setCertList] = useState<ICertificate[]>(certList);

  useEffect(() => {
    console.log('xx certlist in certififcates', certList);
    setCertList(certList);
  }, [certList]);

  return (
    <TableContainer id="table-container" sx={{ backgroundColor: 'white' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="right">Phone number</TableCell>
            {/* <TableCell align="right">Batch no.</TableCell> */}
            {/* <TableCell align="right">Germinative Faculty</TableCell> */}
            {/* <TableCell align="right">Varietal Purity</TableCell> */}
            {/* <TableCell align="right">Certification period</TableCell> */}
            <TableCell align="right">Date created</TableCell>
            <TableCell align="right">Last Changed</TableCell>
            <TableCell align="right">Seed Variety</TableCell>
            <TableCell align="right">Certified</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certificates &&
            certificates.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell align="right">{row.phoneno}</TableCell>
                  <TableCell align="right">{row.dateCreated}</TableCell>
                  <TableCell align="right">{row.lastChanged}</TableCell>
                  <TableCell align="right">{row.seedvar}</TableCell>
                  <TableCell align="right">
                    {row.status === 0 ? 'Yes' : 'No'}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {/* )} */}
    </TableContainer>
  );
};

export default Certificates;
