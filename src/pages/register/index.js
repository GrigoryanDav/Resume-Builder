import { Form, Button, Input, Flex } from "antd"

const Register = () => {
    return (
        <Form layout='vertical'>
            <Form.Item
                label="First Name"
                name="firstName"
                rules={[{
                    required: true,
                    message: 'Please input your First Name'
                }]}
            >
                <Input type='text' placeholder='First Name' />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{
                    required: true,
                    message: 'Please input your Last Name'
                }]}
            >
                <Input type='text' placeholder='Last Name' />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{
                    required: true,
                    message: 'Please input your Email'
                }]}
            >
                <Input type='text' placeholder='Email' />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password'
                    }
                ]}
            >
                <Input.Password placeholder='Password' />
            </Form.Item>
            <Flex align="center" justify="flex-end" gap='10px'>
                <Button>Sign In</Button>
                <Button type="primary" htmlType="submit">Sign Up</Button>
            </Flex>
        </Form>
    )
}


export default Register