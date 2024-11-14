import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import MainLayout from "./components/layouts/Main";
import Login from "./pages/login";
import Register from "./pages/register";
import { ROUTE_CONSTANTS } from "./core/utils/constants";
import './styles/global.css'


const App = () => {
  return (
    <div>
      <RouterProvider
        router={
          createBrowserRouter(
            createRoutesFromElements(
              <Route path="/" element={<MainLayout />}>
                <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login />} />
                <Route path={ROUTE_CONSTANTS.REGISTER} element={<Register />} />
              </Route>
            )
          )
        }
      />
    </div>
  );
}

export default App;