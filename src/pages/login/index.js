import { Form, Button, Input, Flex } from "antd"


const Login = () => {
    return (
        <Form layout="vertical">
            <Form.Item
                    label="Email"
                    name="email"
                    rules={[{
                        required: true,
                        message: 'Please input your Email'
                    }]}
                >
                    <Input type='email' placeholder='Email' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Please input your Password'
                    },
                    ]}
                >
                    <Input.Password placeholder='Password' />
                </Form.Item>

                <Flex align='center' justify='flex-end' gap='10px'>
                    <Button>Create account</Button>

                    <Button type='primary' htmlType='submit'>
                        Sign In
                    </Button>
                </Flex>
        </Form>
    )
}

export default Login