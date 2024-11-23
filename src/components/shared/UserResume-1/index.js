import { useSelector } from "react-redux"
import { GithubOutlined, FacebookOutlined, PhoneOutlined, EnvironmentOutlined, CheckOutlined, PlusOutlined, FundProjectionScreenOutlined, ScheduleOutlined, ContactsOutlined, ProjectOutlined, BulbOutlined, MailOutlined } from '@ant-design/icons'
import './index.css'


const FirstResume = () => {
    const { authUserInfo: { userData: { resume_sections: { profile, education, skills: { skills }, social, miniProject } } } } = useSelector((store) => store.userProfile)

    const showSkills = (skills) => {
        return skills.map((skill, index) => (
            <li key={index}><span><CheckOutlined /></span>{skill}</li>
        ))
    }

    const showEducations = () => {
        const groupedEducation = Object.keys(education).reduce((acc, key) => {
            const index = key.split('_')[1];
            const field = key.split('_')[2];

            if (!acc[index]) acc[index] = {};
            acc[index][field] = education[key];

            return acc;
        }, {});

        return Object.keys(groupedEducation).map((index) => {
            const item = groupedEducation[index];
            return (
                <div key={index}>
                    <h3><span><PlusOutlined /></span>College/School: {item.collegeSchool}</h3>
                    <h3><span><PlusOutlined /></span>Course Name: {item.courseName}</h3>
                    <h3><span><PlusOutlined /></span>Completion Year: {item.completionYear}</h3>
                    <h3><span><PlusOutlined /></span>Percentage: {item.percentage}</h3>
                </div>
            );
        });
    };


    const showMiniProjects = () => {
        const groupedMiniProjects = Object.keys(miniProject).reduce((acc, key) => {
            const index = key.split('_')[1];
            const field = key.split('_')[2];

            if (!acc[index]) acc[index] = {};
            acc[index][field] = miniProject[key];

            return acc;
        }, {});

        return Object.keys(groupedMiniProjects).map((index) => {
            const item = groupedMiniProjects[index]
            return (
                <div key={index}>
                    <h3><span><ProjectOutlined /></span>Project Name: {item.projectName}</h3>
                    <h3><span><ProjectOutlined /></span>Tech Stack: {item.techStack}</h3>
                    <h3><span><ProjectOutlined /></span>Description: {item.description}</h3>
                </div>
            )
        })
    }

    return (
        <div className="userResume_container">
            <div className="leftSide_container">
                <img src={profile.profileImage} alt="profile-image" />
                <div className="contact">
                    <h2><span><ContactsOutlined /></span>Contact</h2>
                    <div>
                        <h3><span className="home-icon"><EnvironmentOutlined /></span>{profile.adress}</h3>
                        <h3><span><PhoneOutlined /></span>{profile.phoneNumber}</h3>
                    </div>
                </div>
                <hr />
                <div className="social">
                    <h2><span><MailOutlined /></span>Socials</h2>
                    <div>
                        <a href={social.social_facebook} target="_blank" rel="noreferrer"><span className="facebook-icon"><FacebookOutlined /></span>FACEBOOK</a>
                        <a href={social.social_github} target="_blank" rel="noreferrer"><span className="github-icon"><GithubOutlined /> </span>GITHUB</a>
                    </div>
                </div>
            </div>

            <div className="rightSide_container">
                <h1>{profile.firstName} {profile.lastName}</h1>
                <hr />
                <div className="education">
                    <h2><span><ScheduleOutlined /></span>Education</h2>
                    <div>
                        {showEducations()}
                    </div>
                </div>
                <hr />
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
                        {showMiniProjects()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstResume