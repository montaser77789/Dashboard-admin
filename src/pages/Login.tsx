import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrormesg from "../components/ui/Inputerrormessage";
import { data_login } from "../data";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axioInstance from "../components/config/config.instance";
import { errormsg, successmsg } from "../toastifiy";
import { LoginSchema } from "../validation";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [isloading, setisloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setisloading(true);

    console.log(data);
    try {
      const { data: resData, status } = await axioInstance.post(
        "teacher/login",
        data
      );

      Cookies.set("access_token", resData.access_token);
      console.log(resData.access_token);

      // const IN_DAYS = 3;
      // const EXPIRE_IN_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
      // const date = new Date();
      // date.setTime(date.getTime() + EXPIRE_IN_DAYS);
      // const options: Ioptions = { path: "/", expires: date };
      // CookiesServices.set("access_token", resData, options);
      // CookiesServices.set("user", "", options);
      if (status == 200) {
        successmsg({ msg: `${resData.success}` });
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      
      const { response } = error as { response: { data: string } };
      errormsg({ msg: `${response?.data}` });
    } finally {
      setisloading(false);
    }
  };
  interface IFormInput {
    email: string;
    password: string;
  }

  ///////  RENDERS   ///////
  const handleLogin = data_login.map(
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
        Login to get access!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {handleLogin}

        <Button fullWidth isloading={isloading}>
          {" "}
          {isloading ? "loading.." : "Login"}{" "}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
