import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CertificateServices from '../backendServices/CertificateServices';
import ICertificate from '../interfaces/ICertificate';

const Certificates = ({
  certList,
  deleteCert
}: {
  certList: ICertificate[];
  deleteCert?: (id: number) => void;
}) => {
  const [certificates, setCertList] = useState<ICertificate[]>(certList);

  // const deleteCert = (id?: number) => {
  //   CertificateServices.deleteCert(id).then(() =>
  //     console.log('xx has cert been deleted')
  //   );
  // };

  useEffect(() => {
    console.log('xx certlist', certList);
    const cert = certList.filter((row) => row.status !== 2);
    console.log('xx certlist 2', cert);
    setCertList(cert);
  }, [certList]);

  return (
    <>
      {certificates.length < 1 && <h3>No certificates are registered</h3>}
      {certificates && certificates.length > 0 && (
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
              {certificates.map((row) => {
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
                    <TableCell>
                      {deleteCert && (
                        <Button
                          variant="contained"
                          onClick={() => deleteCert(row.id ? row.id : 0)}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {/* )} */}
        </TableContainer>
      )}{' '}
    </>
  );
};

export default Certificates;
