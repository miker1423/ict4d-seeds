export default interface ICertificate {
  id?: number;
  phoneno?: string;
  seedvar?: string;
  certper?: string;
  varpur?: number;
  gerfac?: number;
  batchno?: number;
  // isValid?: boolean;
  // dateCreated: Date;
  // lastChanged?: Date;
  dateCreated?: string;
  lastChanged?: string;
  status?: number;
  organization?: string;
}
