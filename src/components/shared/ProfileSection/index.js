import { Button, Form, Input } from "antd"
import { useNavigate } from "react-router-dom"
import { ROUTE_CONSTANTS } from "../../../core/utils/constants"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { handleNextHelper } from "../../../core/helpers"
import "./index.css"


const ProfileSection = () => {
    const navigate = useNavigate()
    const formData = useSelector((store) => store.formData?.profile || {});
    const profile = useSelector((store) => store.userProfile?.authUserInfo?.userData?.resume_sections?.profile)
    const [form] = Form.useForm()
    const dispatch = useDispatch()


    useEffect(() => {
        if (formData) {
            form.setFieldsValue(formData)
        }

        if (profile) {
            form.setFieldsValue(profile)
        }

    }, [form, formData, profile])

    const handleNext = () => {
        handleNextHelper(form, 'profile', ROUTE_CONSTANTS.EDUCATION_SECTION, dispatch, navigate)
    };

    return (
        <div className="profile_section_container">
            <h3>Add your profile details</h3>
            <Form name="profile" form={form}>
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
                                message: 'Please input your Phone Number'
                            }
                        ]}
                    >
                        <Input placeholder="Phone Number" type="number" />
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
            </Form>
            <Button htmlType="submit" onClick={handleNext} className="profile_button">
                Next
            </Button>
        </div>
    )
}

export default ProfileSection