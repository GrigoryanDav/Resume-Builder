import { Form, Button, Input, Flex, Progress } from "antd"
import AuthWrapper from "../../components/shared/AuthWrapper"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { auth, db } from "../../services/firebase"
import { setDoc, doc } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { ROUTE_CONSTANTS, FIRESTORE_PATH_NAMES, regexpValidation } from "../../core/utils/constants"
import registerBanner from '../../core/images/cv-register.webp'

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [passwordStrength, setPasswordStrength] = useState(0)

    const checkPasswordStrength = (value) => {
        let strength = 0
        if (value.length >= 6) strength += 20
        if (value.length >= 10) strength += 20
        if (/[A-Z]/.test(value)) strength += 20
        if (/[0-9]/.test(value)) strength += 20
        if (/[!@#$%^&*]/.test(value)) strength += 20

        setPasswordStrength(strength)
    }

    const handlePasswordChange = (e) => {
        checkPasswordStrength(e.target.value.trim())
    }

    const handleRegister = async (values) => {
        setLoading(true)
        const { firstName, lastName, email, password } = values
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const { uid } = response.user
            const createdDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid)
            await setDoc(createdDoc, {
                uid, firstName, lastName, email
            })
            navigate(ROUTE_CONSTANTS.LOGIN)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthWrapper title="Sign Up" banner={registerBanner}>
            <Form layout='vertical' form={form} onFinish={handleRegister}>
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
                        },
                        {
                            pattern: regexpValidation,
                            message: 'Wrong Password'
                        }
                    ]}
                >
                    <Input.Password placeholder='Password' onChange={handlePasswordChange} />
                </Form.Item>

                {
                    form.getFieldValue('password') && (
                        <Progress
                            percent={passwordStrength}
                            showInfo={false}
                            strokeColor={
                                passwordStrength < 40 ? 'red' : passwordStrength < 80 ? 'orange' : 'green'
                            }
                        />
                    )
                }

                {

                    form.getFieldValue('password') && (
                        <p style={{ color: passwordStrength < 40 ? 'red' : passwordStrength < 80 ? 'orange' : 'green' }}>
                            {
                                passwordStrength < 40 ? 'Weak password' : passwordStrength < 80 ? 'Medium password' : 'Strong Password'
                            }
                        </p>
                    )
                }

                <Flex align="center" justify="flex-end" gap='10px'>
                    <Link to={ROUTE_CONSTANTS.LOGIN}>Sign In</Link>
                    <Button type="primary" htmlType="submit" loading={loading}>Sign Up</Button>
                </Flex>
            </Form>
        </AuthWrapper>
    )
}


export default Register