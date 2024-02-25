import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/errors/ErrorHandler";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import HomePage from "../pages";
import Coursesuser from "../components/Coursesuser";
import Allcourses from "../pages/Allcourses";

const isLoggedIn = true;
const userData: { email: string } | null = isLoggedIn
  ? { email: "email@gmail.com" }
  : null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={isLoggedIn}
              redirectPath="/login"
              data={userData}
            >
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute
              isAllowed={!isLoggedIn}
              redirectPath="/"
              data={userData}
            >
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute
              isAllowed={!isLoggedIn}
              redirectPath="/login"
              data={userData}
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
              isAllowed={isLoggedIn}
              redirectPath="/login"
              data={userData}
            >
              <Coursesuser />
            </ProtectedRoute>
          }
        />
         </Route>
         <Route
          path="allcourses"
          element={
            <ProtectedRoute
              isAllowed={isLoggedIn}
              redirectPath="/login"
              data={userData}
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
