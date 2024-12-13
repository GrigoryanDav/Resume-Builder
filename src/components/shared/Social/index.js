import { Form, Input } from "antd"
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { URL_PATTERN } from "../../../core/utils/constants";
import './index.css'

const Social = () => {
    const resume_sections = useSelector((store) => store.userProfile?.authUserInfo?.userData?.resume_sections);
    const { form } = useOutletContext()


    // Effect to initialize social links from sessionStorage or Redux
    useEffect(() => {
        let initialSocialData = null;
        const savedSocialData = sessionStorage.getItem('formData-social');
        if (savedSocialData) {
            initialSocialData = JSON.parse(savedSocialData);
        } else if (resume_sections && resume_sections.social) {
            initialSocialData = resume_sections.social;
        }
        if (initialSocialData) {
            form.setFieldsValue(initialSocialData);
        }
    }, [form, resume_sections]);

    return (
        <div className="social_container">
            <h3>Add Facebook and Github social links</h3>
            <div>
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
            </div>
        </div>
    )
}

export default Social