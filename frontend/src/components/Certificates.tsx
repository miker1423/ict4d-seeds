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
import { Link, Navigate } from 'react-router-dom';

const Certificates = ({
  certList,
  deleteCert
}: {
  certList: ICertificate[];
  deleteCert?: (id: number) => void;
}) => {
  const [certificates, setCertList] = useState<ICertificate[]>(certList);

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
              {certificates.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.phoneno}
                  </TableCell>
                  {/* <TableCell align="right">{row.seedvar}</TableCell>
              <TableCell align="right">{row.batchno}</TableCell>
              <TableCell align="right">{row.germfac}</TableCell>
              <TableCell align="right">{row.varpur}</TableCell>
              <TableCell align="right">{row.certificationp}</TableCell>
              <TableCell align="right">{row.dateCreated?.split('T')[0]}</TableCell> */}
                  {/* <TableCell align="right">
                {row.certified ? 'Yes' : 'No'}
              </TableCell> */}
                  {/* <TableCell align="right"><Link id="pdfGen" to="PdfCreator">pog</Link></TableCell> */}
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Certificates;
