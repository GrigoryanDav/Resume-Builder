import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { ROUTE_CONSTANTS } from "../../../core/utils/constants"
import { useSelector } from "react-redux"
import Header from "../../global/Header"


const MainLayout = () => {
    const navigate = useNavigate()
    const { authUserInfo: { isAuth } } = useSelector((store) => store.userProfile)

    useEffect(() => {
        if(!isAuth) {
            navigate(ROUTE_CONSTANTS.LOGIN)
        } else {
            navigate(ROUTE_CONSTANTS.CABINET)
        }
    })

    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}


export default MainLayout