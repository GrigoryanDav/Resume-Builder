import { Form, Input } from "antd"
import { useOutletContext } from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./index.css"
    ;


const ProfileSection = () => {
    const resume_sections = useSelector((store) => store.userProfile?.authUserInfo?.userData?.resume_sections);
    const { form } = useOutletContext()


    // Effect to initialize profile data from sessionStorage or Redux
    useEffect(() => {
        let initialProfileData = null;
        const savedProfileData = sessionStorage.getItem('formData-profile');
        if (savedProfileData) {
            initialProfileData = JSON.parse(savedProfileData);
        } else if (resume_sections && resume_sections.profile) {
            initialProfileData = resume_sections.profile;
        }
        if (initialProfileData) {
            form.setFieldsValue(initialProfileData);
        }
    }, [form, resume_sections]);


    return (
        <div className="profile_section_container">
            <h3>Add your profile details</h3>
            <div>
                <div>
                    <Form.Item
                        name='firstName'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your First Name'
                            }
                        ]}
                    >
                        <Input placeholder='First Name' />
                    </Form.Item>
                    <Form.Item
                        name='lastName'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Last Name'
                            }
                        ]}
                    >
                        <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item
                        name='profileImage'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Profile Image URL'
                            }
                        ]}
                    >
                        <Input type="text" placeholder="Image Url" />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name='phoneNumber'
                        rules={[
                            {
                                required: true,
                                message: 'Please nput your Phone Number'
                            }
                        ]}
                    >
                        <Input placeholder="Phone Number" type="text" />
                    </Form.Item>
                    <Form.Item
                        name='adress'
                        rules={[
                            {
                                required: true,
                                message: 'Please Input your Adress'
                            }
                        ]}
                    >
                        <Input placeholder="Adress" />
                    </Form.Item>
                </div>
            </div>
        </div>
    )
}

export default ProfileSection