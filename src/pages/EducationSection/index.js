import { Form, Input, Button, Flex } from "antd"
import { useState } from "react"
import './index.css'


const EducationSection = () => {
    const [form] = Form.useForm()
    const [educationFields, setEducationFields] = useState([{}])
    const [isDeleteEnabled, setIsDeleteEnabled] = useState(false)

    const addEducationField = () => {
        const newEducationFields = [...educationFields, {}]
        setEducationFields(newEducationFields)
        if (newEducationFields.length > 1) {
            setIsDeleteEnabled(true)
        }
    }

    const deleteEducationField = () => {
        const newEducationFields = educationFields.slice(0, -1)
        setEducationFields(newEducationFields)

        if (newEducationFields.length < 2) {
            setIsDeleteEnabled(false)
        }
    }

    return (
        <div className="education_section_container">
            <h3>Add your Education</h3>
            <Form form={form}>
                {
                    educationFields.map((_, index) => (
                        <div key={index}>
                            <Flex gap={50} justify="space-between">
                                <Form.Item
                                    name={['education', index, 'courseName']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Course Name'
                                        }
                                    ]}
                                >
                                    <Input type="text" placeholder="Course Name" />
                                </Form.Item>

                                <Form.Item
                                    name={['education', index, 'college-School']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your College or School'
                                        }
                                    ]}
                                >
                                    <Input type="text" placeholder="College/School"></Input>
                                </Form.Item>
                            </Flex>

                            <Flex gap={50} justify="space-between">
                                <Form.Item
                                    name={['education', index, 'completionYear']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Completion Year'
                                        }
                                    ]}
                                >
                                    <Input type="number" placeholder="Completion Year" />
                                </Form.Item>

                                <Form.Item
                                    name={['education', index, 'percentage']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Percentage'
                                        }
                                    ]}
                                >
                                    <Input type="text" placeholder="Percentage" />
                                </Form.Item>
                            </Flex>
                        </div>
                    ))
                }
            </Form>

            <Flex gap={20} justify="center">
                <Button
                    type="primary"
                    onClick={deleteEducationField}
                    disabled={!isDeleteEnabled}
                >
                    DELETE
                </Button>

                <Button
                    type="primary"
                    onClick={addEducationField}
                >
                    ADD EDUCATION
                </Button>
            </Flex>
        </div>
    )
}

export default EducationSection