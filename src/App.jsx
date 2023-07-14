import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import "./App.css";
import useAuthCheck from "./hooks/useAuthCheck";
import Loader from "./components/Loader";

function App() {
  const authCheck = useAuthCheck();
  return !authCheck ? (
      <Loader />
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
