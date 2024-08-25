import App from "../App";
import Workspace from "../components/Worskpace/Workspace";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "tasks/:id",
        element: <Workspace />,
      },
    ],
  },
  {
    path: "*",
    element: <App />,
  },
]);
