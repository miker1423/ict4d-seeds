export default interface IUser {
  id?: number;
  phoneno?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  org: string; // THE ONLY UNION AVAILABLE SHOULD JUST BE THE ADMINS UNION/ THIS SHOULD BE STATIC
  role: string;
  token?: string;
}
