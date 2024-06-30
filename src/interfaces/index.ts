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
  UniversityName: string;
  CollegesName: string;
  isBlocked: boolean;
  level: string;
}
export interface Icourses {
  _id?: string;
  id?: string;
  title: string;
  price: string;
  subject: string;
  collegeName: string;
  UniversityName: string;
  level: string;
  departement: string;

  // videoslist:string[];

  photo?: string;
}
export interface Ividoe {
  videoURL: string;
  description: string;
  id: string;
}
export interface Iexam {
  title: string;
  _id: string;
}
export interface Iresult {
  student_name: string;
  result: string;
  course: string;
}

export interface Iquestion {
  _id: string;
  question: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  correctChoice: string;
  correctBolean: boolean;
  role: string;
  img: string;
  mark: string;
  year: string;
  __v: number;
  imgFile?: File | null;
}



