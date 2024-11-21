import { Form, Input, Button } from "antd"
import { useState } from "react"
import './index.css'

const Social = () => {
    const [socials, setSocials] = useState([{}])
    const [isDeleteEnabled, setIsDeleteEnabled] = useState(false)

    const addSocial = () => {
        const newSocialFields = [...socials, {}]
        setSocials(newSocialFields)
        if (newSocialFields.length > 1) {
            setIsDeleteEnabled(true)
        }
    }

    const deleteSocials = () => {
        const newSocialFields = socials.slice(0, -1)
        setSocials(newSocialFields)
        if (newSocialFields.length < 2) {
            setIsDeleteEnabled(false)
        }
    }

    return (
        <div className="social_container">
            <h3>Add social links like linkedin , github etc</h3>
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

            <div>
                <Button
                    onClick={deleteSocials}
                    disabled={!isDeleteEnabled}
                >
                    DELETE SOCIAL
                </Button>

                <Button
                    type="primary"
                    onClick={addSocial}
                >
                    ADD SOCIAL
                </Button>
            </div>
        </div>
    )
}

export default Social