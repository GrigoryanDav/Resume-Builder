import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { handleNextHelper } from "../../../core/helpers";
import './index.css';


const EducationSection = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formData = useSelector((store) => store.formData?.education);
    const education = useSelector((store) => store.userProfile?.authUserInfo?.userData?.resume_sections?.education)
    const [educationFields, setEducationFields] = useState([{}]);
    const [form] = Form.useForm()


    useEffect(() => {
        let initialData = null;

        if (education && Object.keys(education).length > 0) {
            initialData = education;
        }

        if (formData && Object.keys(formData).length > 0) {
            initialData = formData
        }

        if (initialData) {
            const fieldCount = Object.keys(initialData).length / 4;
            const fields = Array(fieldCount).fill({});
            setEducationFields(fields);
            form.setFieldsValue(initialData);
        }
    }, [form, education, formData]);


    const addEducationField = () => {
        setEducationFields([...educationFields, {}]);
    };

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

    const handleNext = () => {
        handleNextHelper(form, 'education', ROUTE_CONSTANTS.SKILLS_SECTION, dispatch, navigate)
    };

    const handleBack = () => {
        navigate(ROUTE_CONSTANTS.PROFILE_SECTION)
    }

    return (
        <div className="education_section_container">
            <h3>Add your Education</h3>
            <Form name="education" form={form}>
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
            </Form>

            <div className="education_buttons">
                <Button type="primary" onClick={deleteEducationField} disabled={educationFields.length <= 1}>
                    DELETE
                </Button>
                <Button type="primary" onClick={addEducationField}>
                    ADD EDUCATION
                </Button>
            </div>

            <div className="navigate_buttons">
                <Button onClick={handleBack}>Back</Button>
                <Button htmlType="submit" onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
};

export default EducationSection;
