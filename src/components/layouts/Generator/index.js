import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, Button, Form, notification } from "antd";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { useState } from "react";
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
    const [currentSection, setCurrentSection] = useState(pathname)
    const [form] = Form.useForm()
    const [formData, setFormData] = useState({})

    const handleNavigate = ({ key }) => {
        saveCurrentSectionData(() => {
            navigate(key)
            setCurrentSection(key)
        })
    }

    const handleHome = () => {
        navigate(ROUTE_CONSTANTS.CABINET)
    }

    const handleNext = () => {
        saveCurrentSectionData(() => {
            const currentIndex = menuItems.findIndex(item => item.key === currentSection)
            const nextIndex = (currentIndex + 1) % menuItems.length
            navigate(menuItems[nextIndex].key)
            setCurrentSection(menuItems[nextIndex].key)
        })
    }

    const handleBack = () => {
        saveCurrentSectionData(() => {
            const currentIndex = menuItems.findIndex(item => item.key === currentSection)
            const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length
            navigate(menuItems[prevIndex].key)
            setCurrentSection(menuItems[prevIndex].key)
        })
    }

    const saveCurrentSectionData = (callback) => {
        form
            .validateFields()
            .then((values) => {
                setFormData((prevData) => ({
                    ...prevData,
                    [currentSection]: values
                }))
                callback()
            })
            .catch(() => {
                notification.error({
                    message: 'Validate Error',
                    description: 'Please fill in all required fields before proceeding.'
                })
            })
    }

    return (
        <div className="generator_layout_main_container">
            <Menu
                className="generator_menu"
                mode="horizontal"
                items={menuItems}
                onSelect={handleNavigate}
                selectedKeys={[currentSection]}
            />
            <div className="content_container">
                <Form form={form}>
                    <Outlet context={{ form, formData }}/>
                </Form>
            </div>

            <div className="generator_buttons">
                <Button onClick={handleBack}>BACK</Button>
                <Button onClick={handleNext}>NEXT</Button>
                <Button type="primary">SAVE AND CONTINUE</Button>
            </div>
            <div className="home_and_logout_buttons">
                <Button onClick={handleHome} type="primary">HOME</Button>
            </div>
        </div>
    )
}

export default GeneratorLayout