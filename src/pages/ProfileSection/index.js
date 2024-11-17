import { Form, Input } from "antd"
import "./index.css"


const ProfileSection = () => {
    const [form] = Form.useForm()
    return (
        <div className="profile_section_container">
            <h3>Add your profile details</h3>
            <Form form={form}>
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
        </div>
    )
}

export default ProfileSection