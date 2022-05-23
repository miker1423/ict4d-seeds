import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import React, { useEffect, useState } from 'react';
import CertificateServices from '../backendServices/CertificateServices';
import ICertificate from '../interfaces/ICertificate';

const Certificates = ({
  certList,
  deleteCert
}: {
  certList: ICertificate[];
  deleteCert: (id: number) => void;
}) => {
  const [certificates, setCertList] = useState<ICertificate[]>(certList);

  const downloadCert = (id: number) => {
    CertificateServices.download(id).then((doc) => {
      console.log('xx doc', doc);
    });
  };

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
        <div>
          <TableContainer
            id="table-container"
            sx={{ backgroundColor: 'white' }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'lightgreen' }}>
                  <TableCell align="center">Phone number</TableCell>
                  <div className="v-line"></div>
                  <TableCell align="center">Seed Variety</TableCell>
                  <div className="v-line"></div>
                  <TableCell align="center">Batch no.</TableCell>
                  <div className="v-line"></div>
                  <TableCell align="center">Germinative Faculty</TableCell>
                  <div className="v-line"></div>
                  <TableCell align="center">Varietal Purity</TableCell>
                  <div className="v-line"></div>
                  <TableCell align="center">Certification period</TableCell>
                  <div className="v-line"></div>
                  <TableCell align="center">Date created</TableCell>
                  <div className="v-line"></div>
                  <TableCell align="center">Organization</TableCell>
                  <div className="v-line"></div>
                  <TableCell align="center">Certified</TableCell>
                  <div className="v-line"></div>
                  <TableCell align="center"></TableCell>
                  <div
                    className="v-line"
                    style={{ borderColor: 'lightgreen' }}
                  ></div>
                  <TableCell align="center"></TableCell>
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
                    <TableCell align="center">{row.phoneno}</TableCell>
                    <div className="v-line2"></div>
                    <TableCell align="center">{row.seedvar}</TableCell>
                    <div className="v-line2"></div>
                    <TableCell align="center">{row.batchno}</TableCell>
                    <div className="v-line2"></div>
                    <TableCell align="center">{row.gerfac}</TableCell>
                    <div className="v-line2"></div>
                    <TableCell align="center">{row.varpur}</TableCell>
                    <div className="v-line2"></div>
                    <TableCell align="center">{row.certper}</TableCell>
                    <div className="v-line2"></div>
                    <TableCell align="center">
                      {row.dateCreated?.split('T')[0]}
                    </TableCell>
                    <div className="v-line2"></div>
                    <TableCell align="center">{row.organization}</TableCell>
                    <div className="v-line2"></div>
                    <TableCell align="center">
                      {row.status === 0 ? 'Yes' : 'No'}
                    </TableCell>

                    <div className="v-line2"></div>
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
                    <div className="v-line2"></div>
                    <TableCell>
                      <Button
                        onClick={() => downloadCert(row.id ? row.id : 0)}
                        variant="contained"
                      >
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default Certificates;
