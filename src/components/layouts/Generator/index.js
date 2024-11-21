import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, Button, Form, notification } from "antd";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { useState, useEffect } from "react";
import { db } from '../../../services/firebase'
import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES, SECTION_KEYS } from "../../../core/utils/constants";
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserProfileInfo } from '../../../state-managment/slices/userProfile';
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
    const dispatch = useDispatch()
    const { authUserInfo: { userData: { uid } } } = useSelector((store) => store.userProfile)
    const [loading, setLoading] = useState(false)
    const [isCurrentSectionComplete, setIsCurrentSectionComplete] = useState(false)
    

    // const formValues = Form.useWatch([], form)
    // const isDisabled = !formValues || Object.values(formValues).some((value) => !value)

    const currentFormValues = Form.useWatch([], form)
    
    useEffect(() => {
        const allFieldsFilled = currentFormValues && Object.values(currentFormValues).every(value => value)

        if(currentSection === ROUTE_CONSTANTS.SOCIAL) {
            setIsCurrentSectionComplete(allFieldsFilled)
        } else {
            setIsCurrentSectionComplete(false)
        }
    }, [currentFormValues, currentSection])

    useEffect(() => {
        if (pathname === ROUTE_CONSTANTS.RESUME_FORM) {
            navigate(ROUTE_CONSTANTS.PROFILE_SECTION);
            setCurrentSection(ROUTE_CONSTANTS.PROFILE_SECTION);
        }
    }, [pathname, navigate]);

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
                const sectionKey = SECTION_KEYS[currentSection]
                if (!sectionKey) {
                    notification.error({
                        message: 'Error! Invalid section key.'
                    })
                    return
                }

                const updatedFormData = {
                    ...formData,
                    [sectionKey]: {
                        ...formData[sectionKey],
                        ...values
                    }
                }

                setFormData(updatedFormData)
                callback(updatedFormData)
            })
            .catch(() => {
                notification.error({
                    message: 'Validate Error',
                    description: 'Please fill in all required fields before proceeding.'
                })
            })
    }

    const handleSaveAndContinue = () => {
        saveCurrentSectionData(async (updatedFormData) => {
            setLoading(true)
            try {
                const userDocRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid)
                await updateDoc(userDocRef, {
                    "resume_sections": updatedFormData
                })
                dispatch(fetchUserProfileInfo())
                navigate(ROUTE_CONSTANTS.USER_RESUME)
                notification.success({
                    message: 'Data successfully saved!'
                })
            } catch (error) {
                console.log(error)
                notification.error({
                    message: 'Oooppps ):  Error during data saving!'
                })
            } finally {
                setLoading(false)
            }
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
                <Form
                    form={form}
                    onFinish={handleSaveAndContinue}
                >
                    <Outlet />
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={!isCurrentSectionComplete}
                    >
                        SAVE AND CONTINUE
                    </Button>
                </Form>
            </div>

            <div className="generator_buttons">
                <Button onClick={handleBack}>BACK</Button>
                <Button onClick={handleNext}>NEXT</Button>
            </div>
            <div className="home_and_logout_buttons">
                <Button onClick={handleHome} type="primary">HOME</Button>
            </div>
        </div>
    )
}

export default GeneratorLayout