import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrormesg from "../components/ui/Inputerrormessage";
import { data_register } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../validation";
import { errormsg, successmsg } from "../toastifiy";
import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { IerrorResponse } from "../interfaces";
import axioInstance from "../components/config/config.instance";

////   ///////  HANDELERS   ///////

const RegisterPage = () => {
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(RegisterSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setisloading(true);

    console.log(data);
    try {
      const { status } = await axioInstance.post("teacher/register", data);
      if (status == 200) {
        successmsg({
          msg: "You will navigate to the login page after 2 second to login",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      
      const objerror = error as AxiosError<IerrorResponse>;
      objerror.response?.data
      errormsg({ msg: `${objerror.response?.data}` });
    } finally {
      setisloading(false);
    }
  };

  interface IFormInput {
    FirstName: string;
    LastName: string;
    email: string;
    password: string;
    mobile: string;
    CollegesName: string;
    UniversityName: string;
  }

  ///////  RENDERS   ///////
  const handleRegister = data_register.map(
    ({ name, placeholder, type, validation }, index) => (
      <div key={index}>
        <Input
          {...register(name, validation)}
          placeholder={placeholder}
          type={type}
        />
        {errors[name] && <InputErrormesg msg={errors[name]?.message} />}
      </div>
    )
  );

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {handleRegister}
        <Button fullWidth isloading={isloading}>
          {" "}
          {isloading ? "loading.." : "Register"}{" "}
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
