import { Outlet, Link } from 'react-router-dom'
import { Button } from 'antd'
import { ROUTE_CONSTANTS } from '../../../core/utils/constants'
import './index.css'

const UserResumeLayout = () => {
    return (
        <div className='user_resume_layout'>
            <Outlet />
            <Link to={ROUTE_CONSTANTS.CABINET}><Button type='primary'>Cabinet</Button></Link>
        </div>
    )
}

export default UserResumeLayout