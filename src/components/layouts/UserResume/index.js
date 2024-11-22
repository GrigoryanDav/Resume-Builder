import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Menu } from 'antd'
import { ROUTE_CONSTANTS } from '../../../core/utils/constants'
import './index.css'

const menuItems = [
    {
        label: '1st Template',
        key: ROUTE_CONSTANTS.USER_RESUME_1,
    },
    {
        label: '2nd Template',
        key: ROUTE_CONSTANTS.USER_RESUME_2
    }
]

const UserResumeLayout = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()


    const handleNavigate = ({ key }) => {
        navigate(key)
    }

    return (
        <div className='user_resume_layout'>
            <Outlet />
            <Menu
                className='resume_templates_menu'
                mode='vertical'
                items={menuItems}
                onSelect={handleNavigate}
                selectedKeys={[pathname]}
            />
              <Link to={ROUTE_CONSTANTS.CABINET}><Button type='primary'>Cabinet</Button></Link>
        </div>
    )
}

export default UserResumeLayout