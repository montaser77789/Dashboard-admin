import { useParams } from "react-router-dom";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";

const Coursesuser = () => {
  const params = useParams();
  const userId = params.userId;
  console.log(userId);
  const { data, isLoading } = UseAuthenticatedQuery({
    queryKey: ["corses"],
    url: `course/getcourse/${userId}`,
  });
  console.log(data);

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div>
      <h1>couseUser</h1>
    </div>
  );
};

export default Coursesuser;
