import { NavLink } from "react-router-dom";
import Button from "../components/ui/Button";
import { useDispatch } from "react-redux";
import { addQuestion } from "../app/Slices/selectedQuestion";
import { Iquestion } from "../interfaces";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Cookies from "js-cookie";

const QuestionbankSelector = () => {
  const token = Cookies.get("access_token");
  const dispatch = useDispatch();

  const onSelected = (q: Iquestion) => {
    dispatch(addQuestion(q));
  };

  const { data, error, isLoading } = UseAuthenticatedQuery({
    queryKey: ['question'],
    url: "questionbank/get_questions",
    config: {
      headers: {
        Authorization: token,
      },
    },
  });
  console.log(data);

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
          {q.img && (
            <div className="mb-4">
              <img
                src={q.img}
                alt="Question Image"
                className="w-full h-auto max-w-md mx-auto rounded"
              />
            </div>
          )}
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
              <span>Choose this question</span>
              <input
                className="w-4 h-4"
                onChange={() => onSelected(q)}
                type="checkbox"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionbankSelector;
