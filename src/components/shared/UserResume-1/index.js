import { useSelector } from "react-redux"
import { showEducations, showMiniProjects, showSkills } from "../../../core/helpers"
import { GithubOutlined, FacebookOutlined, PhoneOutlined, EnvironmentOutlined, FundProjectionScreenOutlined, ScheduleOutlined, ContactsOutlined, BulbOutlined, MailOutlined } from '@ant-design/icons'
import './index.css'


const FirstResume = () => {
    const { authUserInfo: { userData: { resume_sections: { profile, education, skills: { skills }, social, miniProject } } } } = useSelector((store) => store.userProfile)

    return (
        <div className="userResume_container">
            <div className="first_profile_img">
                <img src={profile.profileImage} alt="profile-image" />
            </div>
            <div className="first_userName">
                <h1>{profile.firstName} {profile.lastName}</h1>
            </div>
            <div className="contact">
                <h2><span><ContactsOutlined /></span>Contact</h2>
                <div>
                    <h3><span className="home-icon"><EnvironmentOutlined /></span>{profile.adress}</h3>
                    <h3><span><PhoneOutlined /></span>{profile.phoneNumber}</h3>
                </div>
            </div>
            <div className="education">
                <h2><span><ScheduleOutlined /></span>Education</h2>
                <div>
                    {showEducations(education)}
                </div>
            </div>
            <div className="social">
                <h2><span><MailOutlined /></span>Socials</h2>
                <div>
                    <a href={social.social_facebook} target="_blank" rel="noreferrer"><span className="facebook-icon-1"><FacebookOutlined /></span>FACEBOOK</a>
                    <a href={social.social_github} target="_blank" rel="noreferrer"><span className="github-icon-1"><GithubOutlined /> </span>GITHUB</a>
                </div>
            </div>
                <div className="skills">
                    <h2><span><BulbOutlined /></span>Skills</h2>
                    <ul>
                        {showSkills(skills)}
                    </ul>
                </div>
                <hr />
                <div className="mini_project">
                    <h3><span><FundProjectionScreenOutlined /></span>Mini Project</h3>
                    <div>
                        {showMiniProjects(miniProject)}
                    </div>
                </div>
            </div>
    )
}

export default FirstResume