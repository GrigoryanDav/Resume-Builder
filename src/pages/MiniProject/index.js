import { Form, Input, Button } from "antd"
import './index.css'


const MiniProject = () => {
    return (
        <div className="mini_project_container">
            <h3>Add your Mini Projects</h3>
            <Form>
                <Form.Item
                    name='projectName'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Project Name'
                        }
                    ]}
                >
                    <Input type="text" placeholder="Project Name"/>
                </Form.Item>

                <Form.Item
                    name='techStack'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Tech Stack'
                        }
                    ]}
                >
                        <Input type="text" placeholder="Tech Stack"/>
                </Form.Item>

                <Form.Item
                    name='description'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Description'
                        }
                    ]}
                >
                    <Input type="text" placeholder="Description"/>
                </Form.Item>
            </Form>

            <div>
                <Button>DELETE</Button>
                <Button type="primary">ADD PROJECT</Button>
            </div>
        </div>
    )
}

export default MiniProject