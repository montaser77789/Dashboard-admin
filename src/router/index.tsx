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
import RegisterPage from "../pages/Register";
import HomePage from "../pages";
import Coursesuser from "../components/Coursesuser";
import Allcourses from "../pages/Allcourses";
import CookiesServices from "../Cookes";
import DashboardLayout from "../Layout/DashboardLayout";
import CourseDeateailse from "../pages/courseDeateailse";

const token = CookiesServices.get("access_token");


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
          path="register"
          element={
            <ProtectedRoute
              isAllowed={!token}
              redirectPath="/login"
              data={token}
            >
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route path="viewcorseuser">
          <Route
            path={":userId"}
            element={
              <ProtectedRoute
                isAllowed={token}
                redirectPath="/login"
                data={token}
              >
                <Coursesuser />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      <Route
        path="/dashboard"
        element={<DashboardLayout  />}
        errorElement={<ErrorHandler />}
      >

           <Route
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
        />

         <Route path="viwdeatels">
          <Route
            path={":courseId"}
            element={
              <ProtectedRoute
                isAllowed={token}
                redirectPath="/login"
                data={token}
              >
                <CourseDeateailse />
              </ProtectedRoute>
            }
          />
        </Route>
     
        <Route
          path="allcourses"
          element={
            <ProtectedRoute
              isAllowed={token}
              redirectPath="/login"
              data={token}
            >
              <Allcourses />
            </ProtectedRoute>
          }
        />

      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
