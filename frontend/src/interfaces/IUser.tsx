export default interface IFarmer {
  id?: number;
  phoneno: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  username: string;
  password: string;
  organization?: string; // THE ONLY UNION AVAILABLE SHOULD JUST BE THE ADMINS UNION/ THIS SHOULD BE STATIC
}
