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
                {
                    socials.map((_, index) => (
                        <div key={index}>
                            <Form.Item
                                name='socialLinks'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Social Links'
                                    }
                                ]}
                            >
                                <Input type="text" placeholder="Social Links"/>
                            </Form.Item>
                        </div>
                    ))
                }
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