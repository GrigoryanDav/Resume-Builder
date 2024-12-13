import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import './index.css';


const EducationSection = () => {
    const [educationFields, setEducationFields] = useState([{}]);
    const resume_sections = useSelector((store) => store.userProfile?.authUserInfo?.userData?.resume_sections);
    const { form } = useOutletContext();


    // Effect to initialize project fields from session storage or user profile data.
    useEffect(() => {
        let initialData = null;


        const savedData = sessionStorage.getItem('formData-education');
        if (savedData) {
            initialData = JSON.parse(savedData);
        }

        else if (resume_sections?.education) {
            initialData = resume_sections.education;
        }


        if (initialData) {
            const fieldCount = Object.keys(initialData).length / 4;
            const fields = Array(fieldCount).fill({});
            setEducationFields(fields);
            form.setFieldsValue(initialData);
        }

    }, [form, resume_sections]);


    // Function to add a new education field to the form
    const addEducationField = () => {
        setEducationFields([...educationFields, {}]);
    };


    // Function to delete the last education field
    const deleteEducationField = () => {
        if (educationFields.length > 1) {
            const newFields = educationFields.slice(0, -1);
            setEducationFields(newFields);

            const lastIndex = newFields.length;
            const fieldNames = [
                `education_${lastIndex}_courseName`,
                `education_${lastIndex}_collegeSchool`,
                `education_${lastIndex}_completionYear`,
                `education_${lastIndex}_percentage`,
            ];

            form.resetFields(fieldNames);
        }
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
                <Button type="primary" onClick={addEducationField}>
                    ADD EDUCATION
                </Button>
                <Button type="primary" onClick={deleteEducationField} disabled={educationFields.length <= 1}>
                    DELETE
                </Button>
            </div>
        </div>
    );
};

export default EducationSection;
