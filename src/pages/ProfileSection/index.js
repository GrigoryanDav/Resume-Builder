import { Form, Input } from "antd"
import "./index.css"


const ProfileSection = () => {
    return (
        <div className="profile_section_container">
            <h3>Add your profile details</h3>
            <Form>
                <div>
                    <Form.Item
                        name='firstName'
                    >
                        <Input placeholder='First Name' />
                    </Form.Item>
                    <Form.Item
                        name='lastName'
                    >
                        <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item
                        name='profileImage'
                    >
                        <Input type="text" placeholder="Image Url"/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        name='phoneNumber'
                    >
                        <Input placeholder="Phone Number" type="number" />
                    </Form.Item>
                    <Form.Item
                        name='adress'
                    >
                        <Input placeholder="Adress" />
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default ProfileSection