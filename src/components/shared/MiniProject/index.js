import { Form, Input, Button } from "antd"
import { useState } from "react"
import './index.css'


const MiniProject = () => {
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
            <div>
                {
                    projects.map((_, index) => (
                        <div key={index}>
                            <Form.Item
                                name={`project_${index}_projectName`}
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
                                name={`project_${index}_techStack`}
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
                                name={`project_${index}_description`}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Description'
                                    }
                                ]}
                            >
                                <Input type="text" placeholder="Description"/>
                            </Form.Item>
                        </div>
                    ))
                }
            </div>

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