import { Form, Button, Input, Flex } from "antd"
import AuthWrapper from "../../components/shared/AuthWrapper"
import { Link } from "react-router-dom"
import { ROUTE_CONSTANTS } from "../../core/utils/constants"
import registerBanner from '../../core/images/cv-register.webp'

const Register = () => {
    return (
        <AuthWrapper title="Sign Up" banner={registerBanner}>
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
                    <Link to={ROUTE_CONSTANTS.LOGIN}>Sign In</Link>
                    <Button type="primary" htmlType="submit">Sign Up</Button>
                </Flex>
            </Form>
        </AuthWrapper>
    )
}


export default Register