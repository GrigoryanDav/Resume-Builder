import { CheckOutlined } from '@ant-design/icons'

export const showSkills = (skills) => {
    return skills.map((skill, index) => (
        <li key={index}><span><CheckOutlined /></span>{skill}</li>
    ))
}