import { IloginInput, IregisterInput } from "../interfaces";

export const data_register: IregisterInput[] = [
  {
    placeholder: "First Name",
    name: "FirstName",
    type: "text",
    validation: {
      required: "true",
      minLength: 5,
    },
  },
  {
    placeholder: "Last Name",
    name: "LastName",
    type: "text",
    validation: {
      required: "true",
      pattern: /^[^@]+@[^@'.]+\.[^@'.]{2,}$/,
    },
  },
  {
    placeholder: "mail address",
    name: "email",
    type: "email",
    validation: {
      required: "true",
      minLength: 5,
    },
  },
  {
    placeholder: "Password",
    name: "password",
    type: "password",
    validation: {
      required: "true",
      minLength: 5,
    },
  },
  {
    placeholder: "mobile",
    name: "mobile",
    type: "text",
    validation: {
      required: "true",
      minLength: 5,
    },
  },
  {
    placeholder: "CollegesName",
    name: "CollegesName",
    type: "text",
    validation: {
      required: "true",
      minLength: 5,
    },
  },
  {
    placeholder: "UniversityName",
    name: "UniversityName",
    type: "text",
    validation: {
      required: "true",
      minLength: 5,
    },
  },
];
export const data_login : IloginInput[] =[
    {
        placeholder:"email",
        name:"email",
        type:"email",
        validation:{
            required: "true",
            pattern: /^[^@]+@[^@'.]+\.[^@'.]{2,}$/ ,
        }
    },
    {
        placeholder:"password",
        name:"password",
        type:"password",
        validation:{
            required: "true"
            , minLength: 5
        }
    }
]
