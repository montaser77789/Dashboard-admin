import React, { useState } from "react";
import { Iexam } from "../interfaces";
import Button from "./ui/Button";
import axioInstance from "./config/config.instance";
import Cookies from "js-cookie";
import { successmsg } from "../toastifiy";

const ButtonDelete = ({
  exam,
  setRefrchData,
}: {
  exam: Iexam;
  setRefrchData: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const token = Cookies.get("access_token");
  const [loadingDelete, setLoadingDelete] = useState(false);

  const onDeleteExam = async (id: string) => {
    setLoadingDelete(true);
    try {
      const res = await axioInstance.delete(`teacher/exam/delete_exam/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res);
      successmsg({ msg: `${res.data}` });
      setRefrchData((prev) => (prev = prev + 1));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDelete(false);
    }
  };
  return (
    <div>
      <Button
        variant={"danger"}
        onClick={() => {
          onDeleteExam(exam._id);
        }}
        isloading={loadingDelete}
      >
        DELETE
      </Button>
    </div>
  );
};

export default ButtonDelete;
