import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import './index.css'

const menuItems = [
    {
        label: (
            <div className="menu-item">
                <span className="circle">1</span> Profile Section
            </div>
        ),
        key: ROUTE_CONSTANTS.PROFILE_SECTION,
    },
    {
        label: (
            <div className="menu-item">
                <span className="circle">2</span> Education Section
            </div>
        ),
        key: ROUTE_CONSTANTS.EDUCATION_SECTION,
    },
    {
        label: (
            <div className="menu-item">
                <span className="circle">3</span> Skills Sector
            </div>
        ),
        key: ROUTE_CONSTANTS.SKILLS_SECTOR,
    },
    {
        label: (
            <div className="menu-item">
                <span className="circle">4</span> Mini Project
            </div>
        ),
        key: ROUTE_CONSTANTS.MINI_PROJECT,
    },
    {
        label: (
            <div className="menu-item">
                <span className="circle">5</span> Social
            </div>
        ),
        key: ROUTE_CONSTANTS.SOCIAL,
    }
]

const GeneratorLayout = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const handleNavigate = ({ key }) => {
        navigate(key)
    }

    return (
        <div className="generator_layout_main_container">
            <Menu
                className="generator_menu"
                mode="horizontal"
                items={menuItems}
                onSelect={handleNavigate}
                selectedKeys={[pathname]}
            />
            <Outlet />
        </div>
    )
}

export default GeneratorLayout