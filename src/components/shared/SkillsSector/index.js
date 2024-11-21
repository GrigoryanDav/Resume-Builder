import { Select, Form } from "antd"
import { useState } from "react"
import './index.css'



const SkillsSector = () => {
    const [skills, setSkills] = useState([])

    const handleChange = (value) => {
        setSkills(value)
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
                        style={{ width: '100%' }}
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