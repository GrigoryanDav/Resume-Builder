import { Button } from "antd"
import { Link } from "react-router-dom"
import { ROUTE_CONSTANTS } from "../../core/utils/constants"
import { useSelector } from "react-redux"
import './index.css'

const Cabinet = () => {
    const { authUserInfo: { userData: { firstName, lastName } } } = useSelector((store) => store.userProfile)
    
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
            <Link to={ROUTE_CONSTANTS.RESUME_FORM}><Button type="primary">Create Resume</Button></Link>
            <Button type="primary">My Resume</Button>
            </div>
        </div>
    )
}

export default Cabinet