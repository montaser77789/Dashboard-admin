export interface IregisterInput {
  placeholder: string;
  name:
    | "FirstName"
    | "LastName"
    | "email"
    | "password"
    | "mobile"
    | "CollegesName"
    | "UniversityName";
  type: string;
  validation: {
    required?: string;
    minLength?: number;
    pattern?: RegExp;
  };
}
export interface IerrorResponse {
  error: {
    message?: string;
  };
}
export interface IloginInput {
  placeholder: string;
  name: "email" | "password";
  type: string;
  validation: {
    required?: string;
    minLength?: number;
    pattern?: RegExp;
  };
}
export interface Iusers {
  _id: string;
  FirstName: string;
  LastName: string;
  email: string;
  mobile: string;
  courses: string[];
  UniversityName:string;
  CollegesName:string
}
