import { Form, Input } from "antd"
import './index.css'

const Social = () => {
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