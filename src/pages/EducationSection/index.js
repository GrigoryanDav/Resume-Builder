import { Form, Input, Button, Flex } from "antd"
import './index.css'


const EducationSection = () => {
    const [form] = Form.useForm()
    return (
        <div className="education_section_container">
            <h3>Add your Education</h3>
            <Form form={form}>
                <Flex gap={50} justify="space-between">
                    <Form.Item
                        name='courseName'
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
                        name='college-School'
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
                        name='completionYear'
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
                        name='percentage'
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
            </Form>

            <Flex gap={20} justify="center">
                <Button type="primary">DELETE</Button>
                <Button type="primary">ADD EDUCATION</Button>
            </Flex>
        </div>
    )
}

export default EducationSection