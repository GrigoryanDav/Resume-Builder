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


// Menu items with section names and keys

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
        label: '3 Skills Section',
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


// Function to clear all session data for form sections

const clearAllSessionData = () => {
    menuItems.forEach(item => {
        const sectionKey = SECTION_KEYS[item.key]

        if (sectionKey) {
            sessionStorage.removeItem(`formData-${sectionKey}`);
        }
    })
}

const GeneratorLayout = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [currentSection, setCurrentSection] = useState(pathname)
    const [form] = Form.useForm()
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    const { authUserInfo: { userData: { uid } } } = useSelector((store) => store.userProfile)
    const [loading, setLoading] = useState(false)
    const [isFormComplete, setIsFormComplete] = useState(false)

    const currentFormValues = Form.useWatch([], form)


    useEffect(() => {
        // Check if all form fields are saved in session storage and last section fields are filled
        const isAllSectionsFilled = menuItems.every((item) => {
            const sectionKey = SECTION_KEYS[item.key]
            if (item.key === ROUTE_CONSTANTS.SOCIAL) {
                if (!currentFormValues || Object.keys(currentFormValues).length === 0) {
                    return false;
                }

                return Object.values(currentFormValues).every(value => value)
            }

            const sectionData = sessionStorage.getItem(`formData-${sectionKey}`)
            if (!sectionData) {
                return false
            }
            const parsedData = JSON.parse(sectionData)
            return parsedData && Object.values(parsedData).every((value) => value !== undefined && value !== null && value !== '')
        })

        setIsFormComplete(isAllSectionsFilled)
    }, [currentFormValues, currentSection])

    useEffect(() => {
        // Navigate to the first section if on the resume form route
        if (pathname === ROUTE_CONSTANTS.RESUME_FORM) {
            navigate(ROUTE_CONSTANTS.PROFILE_SECTION);
            setCurrentSection(ROUTE_CONSTANTS.PROFILE_SECTION);
        }
    }, [pathname, navigate]);

    useEffect(() => {
        // Clear session data when navigating away from resume form
        if (!pathname.startsWith('/cabinet/resume-form/')) {
            clearAllSessionData()
        }
    }, [pathname])

    const handleNavigate = ({ key }) => {
        // Save form data before navigating to the next section
        saveCurrentSectionData(() => {
            navigate(key)
            setCurrentSection(key)
        })
    }

    const handleHome = () => {
        navigate(ROUTE_CONSTANTS.CABINET) // Navigate to the cabinet
    }

    const handleNext = () => {
        // Save form data before navigating to the next section
        saveCurrentSectionData(() => {
            const currentIndex = menuItems.findIndex(item => item.key === currentSection)
            const nextIndex = (currentIndex + 1) % menuItems.length
            navigate(menuItems[nextIndex].key)
            setCurrentSection(menuItems[nextIndex].key)
        })
    }

    const handleBack = () => {
        // Navigate to the previous section
        const currentIndex = menuItems.findIndex(item => item.key === currentSection)
        const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length
        navigate(menuItems[prevIndex].key)
        setCurrentSection(menuItems[prevIndex].key)
    }

    const saveCurrentSectionData = (callback) => {
        // Validate all form fields to ensure they are correctly filled
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

                // Merge current form data with the new values for this section
                const updatedFormData = {
                    ...formData,
                    [sectionKey]: {
                        ...formData[sectionKey],
                        ...values
                    }
                }

                setFormData(updatedFormData)
                sessionStorage.setItem(`formData-${sectionKey}`, JSON.stringify(values))
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
        // Save form data and update Firestore 
        saveCurrentSectionData(async (updatedFormData) => {
            setLoading(true)
            try {
                const userDocRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid)
                await updateDoc(userDocRef, {
                    "resume_sections": updatedFormData
                })
                clearAllSessionData()
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

    const isFirstSection = currentSection === menuItems[0].key;
    const isLastSection = currentSection === menuItems[menuItems.length - 1].key;


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
                    <Outlet context={{ form }} />
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={!isFormComplete}
                    >
                        SAVE AND CONTINUE
                    </Button>
                </Form>
            </div>

            <div className="generator_buttons">
                <Button onClick={handleBack} disabled={isFirstSection}>BACK</Button>
                <Button onClick={handleNext} disabled={isLastSection}>NEXT</Button>
            </div>
            <div className="home_button">
                <Button onClick={handleHome} type="primary">HOME</Button>
            </div>
        </div>
    )
}

export default GeneratorLayout