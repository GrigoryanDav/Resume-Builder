import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, Button } from "antd";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import './index.css'

const menuItems = [
    {
        label: '1 Profile Section',
        key: ROUTE_CONSTANTS.PROFILE_SECTION,
    },
    {
        label: '2 Education Section',
        key: ROUTE_CONSTANTS.EDUCATION_SECTION,
    },
    {
        label: '3 Skills Sector',
        key: ROUTE_CONSTANTS.SKILLS_SECTOR,
    },
    {
        label: '4 Mini Project',
        key: ROUTE_CONSTANTS.MINI_PROJECT,
    },
    {
        label: '5 Social',
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
            <div className="content_container">
                <Outlet />
            </div>

            <div className="generator_buttons">
                <Button>BACK</Button>
                <Button type="primary">NEXT</Button>
                <Button type="primary">SAVE AND CONTINUE</Button>
            </div>
        </div>
    )
}

export default GeneratorLayout