import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Menu } from 'antd'
import { ROUTE_CONSTANTS } from '../../../core/utils/constants'
import { jsPDF } from 'jspdf'
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import './index.css'

const menuItems = [
    {
        label: '1st Template',
        key: ROUTE_CONSTANTS.USER_RESUME_1,
    },
    {
        label: '2nd Template',
        key: ROUTE_CONSTANTS.USER_RESUME_2
    },
    {
        label: '3rd Template',
        key: ROUTE_CONSTANTS.USER_RESUME_3
    }
]

const UserResumeLayout = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const pdfRef = useRef()

    const downloadPDF = () => {
        const input = pdfRef.current
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', 'a4', true)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
            const imgX = (pdfWidth - imgWidth * ratio) / 2
            const imgY = 30
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
            pdf.save('resume.pdf')
        })
    }


    const handleNavigate = ({ key }) => {
        navigate(key)
    }

    return (
        <div className='user_resume_layout'>
            <Outlet context={{downloadPDF, pdfRef}} />
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