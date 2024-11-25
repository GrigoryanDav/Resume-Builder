import { useSelector } from "react-redux"
import { FacebookOutlined, GithubOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { showEducations, showMiniProjects, showSkills } from "../../../core/helpers"
import './index.css'

const ThirdResume = () => {
    const { authUserInfo: { userData: { resume_sections: { profile, education, skills: { skills }, social, miniProject } } } } = useSelector((store) => store.userProfile)
    return (
        <div className="third_resume_container">
            <div className="third_img_container">
                <img src={profile.profileImage} alt="profile-image" />
                <h1>{profile.firstName} {profile.lastName}</h1>
            </div>
            <div className="third_education">
                <h1>Education</h1>
                <div>
                    {showEducations(education)}
                </div>
            </div>
            <div className="third_contact">
                <h1>Contact</h1>
                <div>
                    <h3><span><PhoneOutlined /></span>{profile.phoneNumber}</h3>
                    <h3><span><EnvironmentOutlined /></span>{profile.adress}</h3>
                </div>
            </div>
            <div className="third_skills">
                <h1>Skills</h1>
                <ul>
                    {showSkills(skills)}
                </ul>
            </div>
            <div className="third_social">
                <h1>Social</h1>
                <div>
                    <a href={social.social_facebook} target="_blank" rel="noreferrer"><FacebookOutlined />  FACEBOOK</a>
                    <a href={social.social_github} target="_blank" rel="noreferrer"><GithubOutlined />  GITHUB</a>
                </div>
            </div>
            <div className="third_miniProject">
                <h1>Mini Project</h1>
                <div>
                    {showMiniProjects(miniProject)}
                </div>
            </div>
        </div>
    )
}

export default ThirdResume