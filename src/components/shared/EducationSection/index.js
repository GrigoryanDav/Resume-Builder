import { Form, Input, Button } from "antd";
import { useState } from "react";
import './index.css';

const EducationSection = () => {
    const [educationFields, setEducationFields] = useState([{}]);
    const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);

    const addEducationField = () => {
        const newEducationFields = [...educationFields, {}];
        setEducationFields(newEducationFields);
        setIsDeleteEnabled(newEducationFields.length > 1);
    };

    const deleteEducationField = () => {
        const newEducationFields = educationFields.slice(0, -1);
        setEducationFields(newEducationFields);
        setIsDeleteEnabled(newEducationFields.length > 1);
    };

    return (
        <div className="education_section_container">
            <h3>Add your Education</h3>
            <div>
                {educationFields.map((_, index) => (
                    <div key={index} className="education_form_row">
                        <div>
                            <Form.Item
                                name={`education_${index}_courseName`}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Course Name",
                                    },
                                ]}
                            >
                                <Input type="text" placeholder="Course Name" />
                            </Form.Item>

                            <Form.Item
                                name={`education_${index}_collegeSchool`}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your College or School",
                                    },
                                ]}
                            >
                                <Input type="text" placeholder="College/School" />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                name={`education_${index}_completionYear`}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Completion Year",
                                    },
                                ]}
                            >
                                <Input type="number" placeholder="Completion Year" />
                            </Form.Item>

                            <Form.Item
                                name={`education_${index}_percentage`}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Percentage",
                                    },
                                ]}
                            >
                                <Input type="text" placeholder="Percentage" />
                            </Form.Item>
                        </div>
                    </div>
                ))}
            </div>

            <div className="education_buttons">
                <Button
                    type="primary"
                    onClick={addEducationField}
                >
                    ADD EDUCATION
                </Button>
                <Button
                    type="primary"
                    onClick={deleteEducationField}
                    disabled={!isDeleteEnabled}
                >
                    DELETE
                </Button>
            </div>
        </div>
    );
};

export default EducationSection;
