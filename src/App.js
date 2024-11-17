import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layouts/Main";
import Login from "./pages/login";
import Register from "./pages/register";
import { ROUTE_CONSTANTS } from "./core/utils/constants";
import GeneratorLayout from "./components/layouts/Generator";
import Cabinet from "./pages/Cabinet";
import CabinetLayout from "./components/layouts/Cabinet";
import { useEffect } from "react";
import LoadingWrapper from "./components/shared/LoadingWrapper";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfileInfo } from "./state-managment/slices/userProfile";
import EducationSection from "./pages/EducationSection";
import ProfileSection from "./pages/ProfileSection";
import SkillsSector from "./pages/SkillsSector";
import MiniProject from "./pages/MiniProject";
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
                <Route path={ROUTE_CONSTANTS.LOGIN} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Login />} />
                <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Register />} />
                <Route path={ROUTE_CONSTANTS.CABINET} element={isAuth ? <CabinetLayout /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />}>
                  <Route path={ROUTE_CONSTANTS.CABINET} element={<Cabinet />} />
                  <Route path={ROUTE_CONSTANTS.RESUME_FORM} element={<GeneratorLayout />}>
                    <Route path={ROUTE_CONSTANTS.EDUCATION_SECTION} element={<EducationSection />} />
                    <Route path={ROUTE_CONSTANTS.PROFILE_SECTION} element={<ProfileSection />} />
                    <Route path={ROUTE_CONSTANTS.SKILLS_SECTOR} element={<SkillsSector />} />
                    <Route path={ROUTE_CONSTANTS.MINI_PROJECT} element={<MiniProject />}/>
                  </Route>
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