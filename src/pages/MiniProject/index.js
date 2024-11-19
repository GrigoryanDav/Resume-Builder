import { Form, Input, Button } from "antd"
import { useState } from "react"
import './index.css'


const MiniProject = () => {
    const [form] = Form.useForm()
    const [projects, setProjects] = useState([{}])
    const [isDeleteEnabled, setIsDeleteEnabled] = useState(false)

    const addProject = () => {
        const newProjectFields = [...projects, {}]
        setProjects(newProjectFields)
        if (newProjectFields.length > 1) {
            setIsDeleteEnabled(true)
        }
    }

    const deleteProject = () => {
        const newProjectFields = projects.slice(0, -1)
        setProjects(newProjectFields)
        if (newProjectFields.length < 2) {
            setIsDeleteEnabled(false)
        }
    }

    return (
        <div className="mini_project_container">
            <h3>Add your Mini Projects</h3>
            <Form form={form}>
                {
                    projects.map((_, index) => (
                        <div key={index}>
                            <Form.Item
                                name={['project', index, 'projectName']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Project Name'
                                    }
                                ]}
                            >
                                <Input type="text" placeholder="Project Name" />
                            </Form.Item>

                            <Form.Item
                                name={['project', index, 'techStack']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Tech Stack'
                                    }
                                ]}
                            >
                                <Input type="text" placeholder="Tech Stack" />
                            </Form.Item>

                            <Form.Item
                                name={['project', index, 'description']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Description'
                                    }
                                ]}
                            >
                                <Input type="text" placeholder="Description" />
                            </Form.Item>
                        </div>
                    ))
                }
            </Form>

            <div>
                <Button
                    onClick={deleteProject}
                    disabled={!isDeleteEnabled}
                >
                    DELETE
                </Button>

                <Button
                    type="primary"
                    onClick={addProject}
                >
                    ADD PROJECT
                </Button>
            </div>
        </div>
    )
}

export default MiniProject