import { Form, Input, Button } from "antd"
import './index.css'

const Social = () => {
    const [form] = Form.useForm()
    return (
        <div className="social_container">
            <h3>Add social links like linkedin , github etc</h3>
            <Form form={form}>
                <Form.Item
                    name='socialLinks'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Social Links'
                        }
                    ]}
                >
                    <Input type="text" placeholder="Social Links" />
                </Form.Item>
            </Form>

            <div>
                <Button>DELETE SOCIAL</Button>
                <Button type="primary">ADD SOCIAL</Button>
            </div>
        </div>
    )
}

export default Social