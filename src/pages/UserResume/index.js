import { useSelector } from "react-redux"
import './index.css'


const UserResume = () => {
    const { authUserInfo: { userData: { resume_sections: { profile, education, skills: { skills }, social, miniProject } } } } = useSelector((store) => store.userProfile)
    console.log(social)
    const showSkills = (skills) => {
        return skills.map((skill, index) => (
            <li key={index}>{skill}</li>
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
                    <h3>College/School: {item.collegeSchool}</h3>
                    <h3>Course Name: {item.courseName}</h3>
                    <h3>Completion Year: {item.completionYear}</h3>
                    <h3>Percentage: {item.percentage}</h3>
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
                    <h3>Project Name: {item.projectName}</h3>
                    <h3>Tech Stack: {item.techStack}</h3>
                    <h3>Description: {item.description}</h3>
                </div>
            )
        })
    }

    return (
        <div className="userResume_container">
            <div className="leftSide_container">
                <img src={profile.profileImage} alt="profile-image" />
                <div className="contact">
                    <h2>Contact</h2>
                    <div>
                        <h3>{profile.adress}</h3>
                        <h3>{profile.phoneNumber}</h3>
                    </div>
                </div>
                <hr />
                <div className="social">
                    <h2>Socials</h2>
                    <div>
                        <a href={social.social_facebook} target="_blank" rel="noreferrer">FACEBOOK</a>
                        <a href={social.social_github} target="_blank" rel="noreferrer">GITHUB</a>
                    </div>
                </div>
            </div>

            <div className="rightSide_container">
                <h1>{profile.firstName} {profile.lastName}</h1>
                <hr />
                <div className="education">
                    <h2>Education</h2>
                    <div>
                        {showEducations()}
                    </div>
                </div>
                <hr />
                <div className="skills">
                    <h2>Skills</h2>
                    <ul>
                        {showSkills(skills)}
                    </ul>
                </div>
                <hr />
                <div className="mini_project">
                    <h3>Mini Project</h3>
                    <div>
                        {showMiniProjects()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserResume