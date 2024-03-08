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
import Allcourses from "../pages/Allcourses";
import DashboardLayout from "../Layout/DashboardLayout";
import CourseDeateailse from "../pages/courseDeateailse";
import AccessStudent from "../pages/AccessStudent";

import Cookies from "js-cookie";
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
      </Route>

      <Route
        path="/dashboard"
        element={<DashboardLayout />}
        errorElement={<ErrorHandler />}
      >
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
          path="accessstudent"
          element={
            <ProtectedRoute
              isAllowed={isTokenExists}
              redirectPath="/login"
              data={token}
            >
              <AccessStudent />
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
