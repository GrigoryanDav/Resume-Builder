import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, Button, Form, notification } from "antd";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { db } from '../../../services/firebase'
import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../../core/utils/constants";
import { useSelector, useDispatch } from 'react-redux'
import { updateFormData } from "../../../state-managment/slices/formData";
import { fetchUserProfileInfo } from "../../../state-managment/slices/userProfile";
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
        key: ROUTE_CONSTANTS.SKILLS_SECTION,
    },
    {
        label: '4 Mini Project',
        key: ROUTE_CONSTANTS.MINIPROJECT_SECTION,
    },
    {
        label: '5 Social',
        key: ROUTE_CONSTANTS.SOCIAL_SECTION,
    }
]



const GeneratorLayout = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const formData = useSelector((store) => store.formData)
    const { authUserInfo: { userData: { uid } } } = useSelector((store) => store.userProfile)

    const handleNavigate = ({ key }) => {
        navigate(key)
    }


    const handleSaveToFirestore = async () => {
        // Check if all sections are filled
        const incompleteSections = Object.entries(formData).find(([sectionKey, sectionValues]) =>
            Object.keys(sectionValues).length === 0 || Object.values(sectionValues).some(value => value === undefined || value === '' || value === null)
        );


        if (incompleteSections) {
            const [incompleteSection] = incompleteSections;
            notification.warning({
                message: 'Section Incomplete',
                description: `Please complete the ${incompleteSection.replace(/_/g, ' ')} section.`// Replace all underscores (_) in the string `incompleteSection` with spaces ( )
            });
            navigate(ROUTE_CONSTANTS[`${incompleteSection.toUpperCase()}_SECTION`]);
            return;
        }

        // Save to Firestore if everything is valid
        try {
            const docRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
            await updateDoc(docRef, { resume_sections: formData });
            dispatch(fetchUserProfileInfo());
            navigate(ROUTE_CONSTANTS.USER_RESUME);
            notification.success({ message: 'Data saved successfully!' });
        } catch (error) {
            notification.error({ message: 'Failed to save data.', description: error.message });
        }
    }

    const handleFormFinish = (name, { values }) => {
        dispatch(updateFormData({ formName: name, values }));
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
                <Form.Provider
                    onFormFinish={handleFormFinish}
                >
                    <Outlet />
                    <Button onClick={handleSaveToFirestore} type="primary">
                        Save And Continue
                    </Button>
                </Form.Provider>
            </div>

            <Link to={ROUTE_CONSTANTS.CABINET}><Button type="primary">Cabinet</Button></Link>
        </div>
    )
}

export default GeneratorLayout