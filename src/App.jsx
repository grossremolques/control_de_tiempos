import { RouterProvider, createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Ordenes from "./pages/Ordenes";
import Mecanizado from "./pages/Mecanizado";
import Corte from "./pages/Corte";
import Nesting from "./pages/Nesting";
import CorteYMecanizado from "./pages/CorteYMecanizado";
import { AuthContextProvider } from "./context/AuthContext";
import { GlobalContextProvider } from "./context/GlobalContext";
import { ModalContextProvider } from "./context/ModalContext";
import Error from "./pages/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/corte_y_mecanizado",
        element: <CorteYMecanizado />,
        children: [
          {
            path: "/corte_y_mecanizado/",
            element: <Ordenes />,
          },
          {
            path: "/corte_y_mecanizado/mecanizado",
            element: <Mecanizado />,
          },
          {
            path: "/corte_y_mecanizado/corte",
            element: <Corte />,
          },
          {
            path: "/corte_y_mecanizado/nesting",
            element: <Nesting />,
          },
        ],
      },
    ],
  },
  {path: "/*", element: <Error /> },
]);
function App() {
  return (
    <>
      <ModalContextProvider>
        <AuthContextProvider>
          <GlobalContextProvider>
            <RouterProvider router={router} />
          </GlobalContextProvider>
        </AuthContextProvider>
      </ModalContextProvider>
    </>
  );
}

export default App;
