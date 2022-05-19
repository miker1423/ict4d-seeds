export default interface IUser {
  id?: number;
  phoneno: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  username: string;
  password: string;
  organization: string; // THE ONLY UNION AVAILABLE SHOULD JUST BE THE ADMINS UNION/ THIS SHOULD BE STATIC
}
