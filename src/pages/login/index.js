import { Form, Button, Input, Flex, notification } from "antd"
import AuthWrapper from "../../components/shared/AuthWrapper"
import { Link } from "react-router-dom"
import { useState } from "react"
import { ROUTE_CONSTANTS } from "../../core/utils/constants"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../services/firebase"
import { useDispatch } from "react-redux"
import { fetchUserProfileInfo } from "../../state-managment/slices/userProfile"
import loginBanner from '../../core/images/cv-login.avif'


const Login = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    const handleLogin = async (values) => {
        setLoading(true)
        try {
            const { email, password } = values
            await signInWithEmailAndPassword(auth, email, password)
            form.resetFields()
            dispatch(fetchUserProfileInfo())
        } catch (err) {
            notification.error({
                message: 'Invalid Login Credentials',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthWrapper title='Sign In' banner={loginBanner}>
            <Form layout="vertical" form={form} onFinish={handleLogin}>
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
                    <Link to={ROUTE_CONSTANTS.REGISTER}>Create account</Link>

                    <Button type='primary' htmlType='submit' loading={loading}>
                        Sign In
                    </Button>
                </Flex>
            </Form>
        </AuthWrapper>
    )
}

export default Login