import { Button, Form, Input } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { URL_PATTERN, ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { updateFormData } from "../../../state-managment/slices/formData";
import './index.css'

const Social = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formData = useSelector((store) => store.formData?.social || {});
    const social = useSelector((store) => store.userProfile?.authUserInfo?.userData?.resume_sections?.social)


    useEffect(() => {
        if (formData) {
            form.setFieldsValue(formData)
        }

        if(social) {
            form.setFieldsValue(social)
        
        }
    },[form, formData, social])

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            dispatch(updateFormData({ formName: "social", values }));
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    const handleBack = () => {
        navigate(ROUTE_CONSTANTS.MINIPROJECT_SECTION)
    }

    return (
        <div className="social_container">
            <h3>Add Facebook and Github social links</h3>
            <Form name="social" form={form}>
                <Form.Item
                    name='social_facebook'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Facebook Link'
                        },
                        {
                            pattern: URL_PATTERN,
                            message: 'Please enter a valid URL',
                        }
                    ]}
                >
                    <Input type="text" placeholder="Facebook Link" />
                </Form.Item>

                <Form.Item
                    name='social_github'
                    rules={[
                        {
                            required: true,
                            message: 'Please Input your GitHub Link'
                        },
                        {
                            pattern: URL_PATTERN,
                            message: 'Please enter a valid URL',
                        }
                    ]}
                >
                    <Input type="text" placeholder="GitHub Link" />
                </Form.Item>
                <Button onClick={handleBack}>Back</Button>
                <Button htmlType="submit" onClick={handleSave}>Save</Button>
            </Form>
        </div>
    )
}

export default Social