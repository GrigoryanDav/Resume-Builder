import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layouts/Main";
import Login from "./pages/login";
import Register from "./pages/register";
import { ROUTE_CONSTANTS } from "./core/utils/constants";
import ResumeForm from "./pages/ResumeForm";
import { useEffect } from "react";
import LoadingWrapper from "./components/shared/LoadingWrapper";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfileInfo } from "./state-managment/slices/userProfile";
import './styles/global.css'


const App = () => {
  const { loading, authUserInfo: { isAuth } } = useSelector((store => store.userProfile))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserProfileInfo())
  }, [dispatch])

  return (
    <LoadingWrapper loading={loading}>
      <RouterProvider
        router={
          createBrowserRouter(
            createRoutesFromElements(
              <Route path="/" element={<MainLayout />}>
                <Route path={ROUTE_CONSTANTS.LOGIN} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.RESUME_FORM} /> : <Login />} />
                <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.RESUME_FORM} /> : <Register />} />

                <Route path={ROUTE_CONSTANTS.RESUME_FORM} element={isAuth ? <ResumeForm /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />}>

                </Route>
              </Route>
            )
          )
        }
      />
    </LoadingWrapper>
  );
}

export default App;