import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { handleNextHelper } from "../../../core/helpers";
import './index.css';


// MiniProject component allows users to add, edit, and delete mini project details.

const MiniProject = () => {
    const dispatch = useDispatch()
    const [projects, setProjects] = useState([{}]);
    const formData = useSelector((store) => store.formData?.miniProject || {});
    const miniProject = useSelector((store) => store.userProfile?.authUserInfo?.userData?.resume_sections?.miniProject)
    const [form] = Form.useForm()
    const navigate = useNavigate()

    useEffect(() => {
        let initialData = null;

        if (miniProject && Object.keys(miniProject).length > 0) {
            initialData = miniProject;
        }

        if (formData && Object.keys(formData).length > 0) {
            initialData = formData
        }


        if (initialData) {
            const fieldCount = Object.keys(initialData).length / 3;
            const fields = Array(fieldCount).fill({});
            setProjects(fields);
            form.setFieldsValue(initialData);
        }
    }, [form, miniProject, formData]);

    const handleNext = () => {
        handleNextHelper(form, 'miniProject', ROUTE_CONSTANTS.SOCIAL_SECTION, dispatch, navigate)
    }

    const handleBack = () => {
        navigate(ROUTE_CONSTANTS.SKILLS_SECTION)
    }


    // Add a new empty project to the list.
    const addProject = () => {
        setProjects([...projects, {}]);
    };


    // Remove the last project from the list.
    const deleteProject = () => {
        if (projects.length > 1) {
            const newProjectFields = projects.slice(0, -1);
            setProjects(newProjectFields);

            const lastIndex = newProjectFields.length;
            const fieldNames = [
                `project_${lastIndex}_projectName`,
                `project_${lastIndex}_techStack`,
                `project_${lastIndex}_description`,
            ];
            form.resetFields(fieldNames);
        }
    };

    return (
        <div className="mini_project_container">
            <h3>Add your Mini Projects</h3>
            <Form form={form} name="miniProject">
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
            </Form>

            <div className="miniProject_navigate_buttons">
                <Button onClick={handleBack}>Back</Button>
                <Button htmlType="submit" onClick={handleNext}>Next</Button>
            </div>

            <div>
                <Button onClick={deleteProject} disabled={projects.length <= 1}>
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