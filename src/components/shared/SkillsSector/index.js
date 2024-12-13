import { Select, Form } from "antd"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { useSelector } from "react-redux"
import './index.css'



const SkillsSector = () => {
    const [skills, setSkills] = useState([])
    const { form } = useOutletContext()
    const resume_sections = useSelector((store) => store.userProfile?.authUserInfo?.userData?.resume_sections);


    // Effect to initialize skills from sessionStorage or Redux store
    useEffect(() => {
        let initialSkills = [];
        const savedSkills = sessionStorage.getItem('formData-skills');
        if (savedSkills) {
            const parsedSkills = JSON.parse(savedSkills);
            initialSkills = parsedSkills.skills || []
        } else if (resume_sections?.skills?.skills?.length) {
            initialSkills = resume_sections.skills.skills;
        }
        if (initialSkills.length > 0) {
            setSkills(initialSkills);
            form.setFieldsValue({ skills: initialSkills });
        }
    }, [form, resume_sections]);


    // Handler for skill selection changes
    const handleChange = (value) => {
        setSkills(value)
        form.setFieldsValue({ value })
    }

    return (
        <div className="skills_container">
            <h3>Add your Skills</h3>
            <div>
                <Form.Item
                    name='skills'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Skills'
                        }
                    ]}
                >
                    <Select
                        mode="tags"
                        style={{ width: 500 }}
                        placeholder='Type and press Enter to add Skill'
                        value={skills}
                        onChange={handleChange}
                        tokenSeparators={[',']}
                    />
                </Form.Item>
            </div>
        </div>
    )
}

export default SkillsSector