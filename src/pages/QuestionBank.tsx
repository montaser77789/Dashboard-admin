import { NavLink } from "react-router-dom";
import Button from "../components/ui/Button";
import { Iquestion } from "../interfaces";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Cookies from "js-cookie";
import Modal from "../components/Modal";
import { useState } from "react";
import axioInstance from "../components/config/config.instance";
import { successmsg } from "../toastifiy";


const Questionbank= () => {
  const token = Cookies.get("access_token");
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [isLoadingDelete, setisLoadingDelete] = useState(false);
  const [refrchUsers, setrefrchUsers] = useState(0);
  function closeModelDelete() {
    setisOpenDelete(false);
  }


  

  const { data, error, isLoading } = UseAuthenticatedQuery({
    queryKey: [`question${refrchUsers}`],
    url: "questionbank/get_questions",
    config: {
      headers: {
        Authorization: token,
      },
    },
  });
  const handleDeleteCourse = async (questionId: number) => {
    try {
      setisLoadingDelete(true);
      const res = await axioInstance.delete(
        `questionbank/delete_question/${questionId}`
      );
      setrefrchUsers((prev) => (prev = prev + 1));
      successmsg({ msg: `${res.data.message}` });
      console.log(res);
      
    } catch (error) {
      console.log(error);
    } finally {
      closeModelDelete();
      setisLoadingDelete(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Question Bank</h1>
      <div className="flex justify-evenly items-center">
        <p className="text-lg mb-4">Total questions: {data?.length || 0}</p>
        <div className="mb-4">
          <Button>
            <NavLink to="/add-bank-question">Add bank questions</NavLink>
          </Button>
        </div>
      </div>
      {data?.map((q: Iquestion) => (
        <div key={q._id} className="border p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-4">{q.question}</h2>
          <div className="flex flex-col">
            {[q.answer_1, q.answer_2, q.answer_3, q.answer_4].map(
              (answer, answerIndex) => (
                <Button
                  key={answerIndex}
                  className={`${
                    answer === q.correctChoice
                      ? "bg-indigo-800"
                      : "bg-indigo-500"
                  } hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-2`}
                >
                  {answer}
                </Button>
              )
            )}
            <div className="flex items-center gap-2">
              <Button type="button" variant={"danger"} onClick={() => setisOpenDelete(true)} >
                DELETE
              </Button>
            
            </div>
          </div>
         <Modal
        title="Are you sure you want to delete the course?"
        isopen={isOpenDelete}
        closeModal={closeModelDelete}
      >
        <div className="flex w-full space-x-2 justify-end">
          <Button
            isloading={isLoadingDelete}
            variant={"danger"}
            onClick={() => handleDeleteCourse(q._id)}
            
          >
            {isLoading ? "loading.." : "Delete"}
          </Button>
          <Button variant="cancel" onClick={closeModelDelete} type="button">
            Cancel
          </Button>
        </div>
      </Modal>
        </div>
      ))}
    </div>
  );
};

export default Questionbank;
