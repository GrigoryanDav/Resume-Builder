import { useSelector } from 'react-redux'
import './index.css'

const UserResume = () => {
    const { authUserInfo: { userData: { firstName, lastName } } } = useSelector((store) => store.userProfile)

    return (
        <div className='resume_container'>
            <h2>
                Hello dear {firstName} {lastName}
            </h2>
            <h3>
                <span>Explore Your Professional Profiles</span> <br />
                Welcome to your portfolio page, where you can explore various tailored resumes that showcase your skills, experiences, and achievements.
                Each resume is customized to highlight a different area of expertise,
                making it easier for you to find the information that aligns with your interests or requirements.<br />
                Simply click on the buttons below to view the resume that suits your needs. Whether you're looking for your technical background, leadership roles, or creative projects, it's all here for you to discover.<br />
                Take your time and feel free to explore!
            </h3>
        </div>
    )
}

export default UserResume