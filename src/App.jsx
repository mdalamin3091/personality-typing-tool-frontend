import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import "./App.css";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
  const authCheck = useAuthCheck();
  return !authCheck ? (
    <h3>authecation checking...</h3>
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
