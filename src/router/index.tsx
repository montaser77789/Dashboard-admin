import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
import RootLayout from "../Layout/Layout";
import ErrorHandler from "../components/errors/ErrorHandler";
import LoginPage from "../pages/Login";
import HomePage from "../pages";
import Allcourses from "../pages/Allcourses";
import CourseDeateailse from "../pages/courseDeateailse";
import Cookies from "js-cookie";
import Coursesuser from "../pages/CoursesUser";
import AddExam from "../pages/AddExam";
import CreateQuetion from "../pages/CreateQuetion";
import Quizes from "../pages/Quizes";
import TheResulst from "../pages/TheResulst";
import ExamDetails from "../pages/ExamDetails";
import CourseCode from "../pages/CourseCode";
import VidoeCode from "../pages/VideoCode";
import Addbankquestions from "../pages/Addbankquestions";
import CreateExamToCourse from "../pages/CreateExamToCourse";
import Questionbank from "../pages/QuestionBank";
import QuestionbankSelector from "../pages/questionbankSelector";
const token = Cookies.get("access_token");
const isTokenExists = !!token;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        {/* <Route
          index
          element={
            <ProtectedRoute
              isAllowed={token}
              redirectPath="/login"
              data={token}
            >
              <HomePage />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!token} redirectPath="/" data={token}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={isTokenExists}
              redirectPath="/login"
              data={token}
            >
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="allcourses"
          element={
            <ProtectedRoute
              isAllowed={isTokenExists}
              redirectPath="/login"
              data={token}
            >
              <Allcourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="addexam"
          element={
            <ProtectedRoute
              isAllowed={isTokenExists}
              redirectPath="/login"
              data={token}
            >
              <AddExam />
            </ProtectedRoute>
          }
        />

        <Route path="viwdeatels">
          <Route
            path={":courseId"}
            element={
              <ProtectedRoute
                isAllowed={isTokenExists}
                redirectPath="/login"
                data={token}
              >
                <CourseDeateailse />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="createQuetion">
          <Route
            path={":Idexam"}
            element={
              <ProtectedRoute
                isAllowed={isTokenExists}
                redirectPath="/login"
                data={token}
              >
                <CreateQuetion />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="quize/result">
          <Route
            path={":examId"}
            element={
              <ProtectedRoute
                isAllowed={isTokenExists}
                redirectPath="/login"
                data={token}
              >
                <TheResulst />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="deatels">
          <Route
            path={":examId"}
            element={
              <ProtectedRoute
                isAllowed={isTokenExists}
                redirectPath="/login"
                data={token}
              >
                <ExamDetails />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="courseCode">
          <Route
            path={":courseId"}
            element={
              <ProtectedRoute
                isAllowed={isTokenExists}
                redirectPath="/login"
                data={token}
              >
                <CourseCode />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="vidoecode">
          <Route
            path={":videoId"}
            element={
              <ProtectedRoute
                isAllowed={isTokenExists}
                redirectPath="/login"
                data={token}
              >
                <VidoeCode />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="quize"
          element={
            <ProtectedRoute
              isAllowed={isTokenExists}
              redirectPath="/login"
              data={token}
            >
              <Quizes />
            </ProtectedRoute>
          }
        />

        <Route path="viewcorseuser">
          <Route
            path={":userId"}
            element={
              <ProtectedRoute
                isAllowed={isTokenExists}
                redirectPath="/login"
                data={token}
              >
                <Coursesuser />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="questionbankselector"
          element={
            <ProtectedRoute
              isAllowed={isTokenExists}
              redirectPath="/login"
              data={token}
            >
              <QuestionbankSelector />
            </ProtectedRoute>
          }
        />
           <Route
          path="questionbank"
          element={
            <ProtectedRoute
              isAllowed={isTokenExists}
              redirectPath="/login"
              data={token}
            >
              <Questionbank />
            </ProtectedRoute>
          }
        />
          <Route
          path="add-bank-question"
          element={
            <ProtectedRoute
              isAllowed={isTokenExists}
              redirectPath="/login"
              data={token}
            >
              <Addbankquestions />
            </ProtectedRoute>
          }
        />
        
        <Route path="createexamtocourse">
          <Route
            path={":courseId"}
            element={
              <ProtectedRoute
                isAllowed={isTokenExists}
                redirectPath="/login"
                data={token}
              >
                <CreateExamToCourse />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
