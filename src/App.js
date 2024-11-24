import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layouts/Main";
import Login from './pages/Login';
import Register from './pages/Register'
import { ROUTE_CONSTANTS } from "./core/utils/constants";
import GeneratorLayout from "./components/layouts/Generator";
import Cabinet from "./pages/Cabinet";
import CabinetLayout from "./components/layouts/Cabinet";
import { useEffect } from "react";
import LoadingWrapper from "./components/shared/LoadingWrapper";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfileInfo } from "./state-managment/slices/userProfile";
import EducationSection from "./components/shared/EducationSection";
import ProfileSection from "./components/shared/ProfileSection";
import SkillsSector from "./components/shared/SkillsSector";
import MiniProject from "./components/shared/MiniProject";
import Social from "./components/shared/Social";
import FirstResume from "./components/shared/UserResume-1";
import UserResumeLayout from "./components/layouts/UserResume";
import SecondResume from "./components/shared/UserRsume-2";
import UserResume from "./pages/UserResume";
import InitialPage from "./pages/Initial";
import './styles/global.css'


const App = () => {
  const { loading, authUserInfo: { isAuth, userData: { resume_sections } } } = useSelector((store => store.userProfile))
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
                <Route path='/' element={<InitialPage />}/>
                <Route path={ROUTE_CONSTANTS.LOGIN} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Login />} />
                <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Register />} />
                <Route path={ROUTE_CONSTANTS.CABINET} element={isAuth ? <CabinetLayout /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />}>
                  <Route path={ROUTE_CONSTANTS.CABINET} element={<Cabinet />} />
                  <Route path={ROUTE_CONSTANTS.USER_RESUME} element={ resume_sections ? <UserResumeLayout /> : <Navigate to={ROUTE_CONSTANTS.RESUME_FORM} />}>
                    <Route path={ROUTE_CONSTANTS.USER_RESUME} element={<UserResume />}/>
                    <Route path={ROUTE_CONSTANTS.USER_RESUME_1} element={<FirstResume />}/>
                    <Route path={ROUTE_CONSTANTS.USER_RESUME_2} element={<SecondResume />}/>
                  </Route>
                  <Route path={ROUTE_CONSTANTS.RESUME_FORM} element={<GeneratorLayout />}>
                    <Route path={ROUTE_CONSTANTS.EDUCATION_SECTION} element={<EducationSection />} />
                    <Route path={ROUTE_CONSTANTS.PROFILE_SECTION} element={<ProfileSection />} />
                    <Route path={ROUTE_CONSTANTS.SKILLS_SECTOR} element={<SkillsSector />} />
                    <Route path={ROUTE_CONSTANTS.MINI_PROJECT} element={<MiniProject />}/>
                    <Route path={ROUTE_CONSTANTS.SOCIAL} element={<Social />}/>
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