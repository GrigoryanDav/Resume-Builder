import { Select } from "antd"
import { useState } from "react"
import './index.css'


const { Option } = Select

const SkillsSector = () => {
    const [skills, setSkills] = useState([])

    const handleChange = (value) => {
        setSkills(value)
    }

    return (
        <div className="skills_container">
            <h3>Add your Skills</h3>
            <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder='Type and press Enter to add Skill'
                value={skills}
                onChange={handleChange}
                tokenSeparators={[',']}
            >
                {
                    skills.map((skill) => {
                        return (
                            <Option key={skill}>{skill}</Option>
                        )
                    })
                }
            </Select>
        </div>
    )
}

export default SkillsSector