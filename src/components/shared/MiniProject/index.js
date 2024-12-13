import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import './index.css';


// MiniProject component allows users to add, edit, and delete mini project details.

const MiniProject = () => {
    const [projects, setProjects] = useState([{}]);
    const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);
    const { form } = useOutletContext();
    const resume_sections = useSelector((store) => store.userProfile?.authUserInfo?.userData?.resume_sections);


    // Effect to initialize project fields from session storage or user profile data.
    useEffect(() => {
        let initialData = null;

        const savedData = sessionStorage.getItem('formData-miniProject');
        if (savedData) {
            initialData = JSON.parse(savedData);
        }
        else if (resume_sections?.miniProject) {
            initialData = resume_sections.miniProject;
        }

        if (initialData) {
            const fieldCount = Object.keys(initialData).length / 3;
            const fields = Array(fieldCount).fill({});
            setProjects(fields);
            form.setFieldsValue(initialData);
            setIsDeleteEnabled(fields.length > 1);
        }
    }, [form, resume_sections]);


    // Add a new empty project to the list.
    const addProject = () => {
        const newProjectFields = [...projects, {}];
        setProjects(newProjectFields);
        setIsDeleteEnabled(newProjectFields.length > 1);
    };


    // Remove the last project from the list.
    const deleteProject = () => {
        const newProjectFields = projects.slice(0, -1);
        setProjects(newProjectFields);
        setIsDeleteEnabled(newProjectFields.length > 1);

        const lastIndex = newProjectFields.length;
        const fieldNames = [
            `project_${lastIndex}_projectName`,
            `project_${lastIndex}_techStack`,
            `project_${lastIndex}_description`,
        ];
        form.resetFields(fieldNames);
    };

    return (
        <div className="mini_project_container">
            <h3>Add your Mini Projects</h3>
            <div>
                {projects.map((_, index) => (
                    <div key={index}>
                        <Form.Item
                            name={`project_${index}_projectName`}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Project Name',
                                },
                            ]}
                        >
                            <Input type="text" placeholder="Project Name" />
                        </Form.Item>

                        <Form.Item
                            name={`project_${index}_techStack`}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Tech Stack',
                                },
                            ]}
                        >
                            <Input type="text" placeholder="Tech Stack" />
                        </Form.Item>

                        <Form.Item
                            name={`project_${index}_description`}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Description',
                                },
                            ]}
                        >
                            <Input type="text" placeholder="Description" />
                        </Form.Item>
                    </div>
                ))}
            </div>

            <div>
                <Button onClick={deleteProject} disabled={!isDeleteEnabled}>
                    DELETE
                </Button>

                <Button type="primary" onClick={addProject}>
                    ADD PROJECT
                </Button>
            </div>
        </div>
    );
};

export default MiniProject;