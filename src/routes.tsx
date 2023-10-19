import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Calendar from "./page/Calendar";
import Annotation from "./page/Annotation";
import ListDay from "./page/ListDay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Calendar /> },
      {
        path: "/anotacoes",
        element: <Annotation />,
      },
      {
        path: "/lista-do-dia",
        element: <ListDay />,
      },
    ],
  },
]);

export default router;
