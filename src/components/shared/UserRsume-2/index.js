import { useSelector } from 'react-redux'
import { EnvironmentOutlined, PhoneOutlined, FacebookOutlined, GithubOutlined } from '@ant-design/icons'
import { showEducations, showMiniProjects, showSkills } from '../../../core/helpers'
import './index.css'

const SecondResume = () => {
    const { authUserInfo: { userData: { resume_sections: { profile, education, skills: { skills }, social, miniProject } } } } = useSelector((store) => store.userProfile)
    return (
        <div className='second_resume_container'>
            <div className='second_education'>
                <h1>Education</h1>
                <div>
                    {showEducations(education)}
                </div>
            </div>
            <div className='second_profile_container'>
                    <img src={profile.profileImage} alt='profile-image' />
                    <h1><span>{profile.firstName}</span> {profile.lastName}</h1>
            </div>
            <div className='second_skills'>
                <h1>Skills</h1>
                <ul>
                    {showSkills(skills)}
                </ul>
            </div>
            <div className='second_contact_container'>
                <h1>Contact</h1>
                <div>
                    <h3><span><PhoneOutlined /></span>{profile.phoneNumber}</h3>
                    <h3><span><EnvironmentOutlined /></span>{profile.adress}</h3>
                </div>
            </div>
            <div className='second_miniProject'>
                <h1>Mini Project</h1>
                <div>
                    {showMiniProjects(miniProject)}
                </div>
            </div>
            <div className='second_social_container'>
                <h1>Social</h1>
                <div>
                    <a href={social.social_facebook} target="_blank" rel="noreferrer"><span className="facebook-icon-2"><FacebookOutlined /></span>FACEBOOK</a>
                    <a href={social.social_github} target="_blank" rel="noreferrer"><span className="github-icon-1"><GithubOutlined /> </span>GITHUB</a>
                </div>
            </div>
        </div>
    )
}

export default SecondResume