import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AddCharacter from "../pages/AddCharacter";
import Layout from "../Layout/Layout";
import EditCharacter from "../pages/EditCharacter";
import CharacterDetails from "../pages/CharacterDetails";
import CastDetails from "../pages/CastDetails";
import AddCast from "../pages/AddCast";
import EditCast from "../pages/EditCast";
import SignupPage from "../pages/SignupPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/add-character",
        element: <AddCharacter></AddCharacter>,
      },
      {
        path: "/edit-character/:id",
        element: <EditCharacter></EditCharacter>,
      },
      {
        path: "/add-cast",
        element: <AddCast></AddCast>,
      },
      {
        path: "/edit-cast/:id",
        element: <EditCast></EditCast>,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        {" "}
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignupPage />{" "}
      </PublicRoute>
    ),
  },
  {
    path: "/character/:id",
    element: (
      <PrivateRoute>
        <CharacterDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/cast/:id",
    element: (
      <PrivateRoute>
        <CastDetails />
      </PrivateRoute>
    ),
  },
]);
