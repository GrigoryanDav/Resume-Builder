import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { ROUTE_CONSTANTS } from '../../core/utils/constants'
import './index.css'

const InitialPage = () => {
    return (
        <div className='initialPage_container'>
            <div className='first-image'></div>
            <div className='information_container'>
                <h1>Welcome to resume generator</h1>
                <h3>
                    Here you can discover your new digital experience.<br />
                    Sign up to explore endless possibilities or log in to continue your journey.
                </h3>
                <div>
                    <Link to={ROUTE_CONSTANTS.LOGIN}><Button>Sign In</Button></Link>
                    <Link to={ROUTE_CONSTANTS.REGISTER}><Button>Sign Up</Button></Link>
                </div>
            </div>
            <div className='second-image'></div>
        </div>
    )
}

export default InitialPage