import { Button } from "antd"
import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebase"
import { ROUTE_CONSTANTS } from "../../core/utils/constants"
import { useSelector, useDispatch } from "react-redux"
import { setIsAuth } from "../../state-managment/slices/userProfile"
import './index.css'

const Cabinet = () => {
    const { authUserInfo: { userData: { firstName, lastName, resume_sections } } } = useSelector((store) => store.userProfile)
    const dispatch = useDispatch()

    const handleLogOut = async () => {
        try {
            await signOut(auth)
            dispatch(setIsAuth(false))
        } catch (e) {
            console.log(e, 'Sign Out Error!')
        }
    }

    return (
        <div className="cabinet_container">
            <h2>
                Hello {firstName} {lastName}.
            </h2>
            <h3>
                This is resume generator. You can press Create Resume button to start creating your resume
                or if you already have a ready resume, you can click My Resume button to view it
            </h3>
            <div>
                <Link to={ROUTE_CONSTANTS.RESUME_FORM}><Button type="primary">{resume_sections ? 'Edit Resume' : 'Create Resume'}</Button></Link>
                <Link to={ROUTE_CONSTANTS.USER_RESUME}><Button type="primary">My Resume</Button></Link>
                <Button onClick={handleLogOut} type="primary">Log Out</Button>
            </div>
        </div>
    )
}

export default Cabinet