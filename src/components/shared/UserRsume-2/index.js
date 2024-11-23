import { useSelector } from 'react-redux'
import { EnvironmentOutlined, PhoneOutlined, FacebookOutlined, GithubOutlined } from '@ant-design/icons'
import { showEducations, showMiniProjects, showSkills } from '../../../core/helpers'
import './index.css'

const SecondResume = () => {
    const { authUserInfo: { userData: { resume_sections: { profile, education, skills: { skills }, social, miniProject } } } } = useSelector((store) => store.userProfile)
    return (
        <div className='second_resume_container'>
            <div className='left_side'>
                <h1><span>{profile.firstName}</span> {profile.lastName}</h1>
                <div className='second_skills'>
                    <h1>Skills</h1>
                    <ul>
                        {showSkills(skills)}
                    </ul>
                </div>
                <div className='second_education'>
                    <h1>Education</h1>
                    <div>
                        {showEducations(education)}
                    </div>
                </div>
                <div className='second_miniProject'>
                    <h1>Mini Project</h1>
                    <div>
                        {showMiniProjects(miniProject)}
                    </div>
                </div>
            </div>
            <div className='right_side'>
                <div className='second_img_container'>
                    <img src={profile.profileImage} alt='profile-image' />
                </div>
                <div className='contact_container'>
                    <h1>Contact</h1>
                    <div>
                        <h3><span><PhoneOutlined /></span>{profile.phoneNumber}</h3>
                        <h3><span><EnvironmentOutlined /></span>{profile.adress}</h3>
                    </div>
                </div>
                <div className='social_container_rightSide'>
                    <h1>Social</h1>
                    <div>
                        <a href={social.social_facebook} target="_blank" rel="noreferrer"><span className="facebook-icon"><FacebookOutlined /></span>FACEBOOK</a>
                        <a href={social.social_github} target="_blank" rel="noreferrer"><span className="github-icon"><GithubOutlined /> </span>GITHUB</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondResume