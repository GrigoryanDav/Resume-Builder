import { Select, Form, Button } from "antd"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTE_CONSTANTS } from "../../../core/utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { handleNextHelper } from "../../../core/helpers"
import './index.css'



const SkillsSector = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [skill, setSkill] = useState([])
    const formData = useSelector((store) => store.formData?.skills || {});
    const  skills  = useSelector((store) => store.userProfile?.authUserInfo?.userData?.resume_sections?.skills)
    const [form] = Form.useForm()
   

    useEffect(() => {
            if (formData) {
                form.setFieldsValue(formData)
            }

            if(skills) {
                form.setFieldsValue(skills)
            }

        }, [form, formData, skills])

    // Handler for skill selection changes
    const handleChange = (value) => {
        setSkill(value)
        form.setFieldsValue({ value })
    }

       const handleNext = () => {
           handleNextHelper(form, 'skills', ROUTE_CONSTANTS.MINIPROJECT_SECTION, dispatch, navigate)
       }

        const handleBack = () => {
            navigate(ROUTE_CONSTANTS.EDUCATION_SECTION)
        }

    return (
        <div className="skills_container">
            <h3>Add your Skills</h3>
            <Form name="skills" form={form}>
                <Form.Item
                    name='skills'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Skills'
                        }
                    ]}
                >
                    <Select
                        mode="tags"
                        style={{ width: 500 }}
                        placeholder='Type and press Enter to add Skill'
                        value={skill}
                        onChange={handleChange}
                        tokenSeparators={[',']}
                    />
                </Form.Item>
                <Button onClick={handleBack}>Back</Button>
                <Button htmlType="submit" onClick={handleNext}>
                    Next
                </Button>
            </Form>
        </div>
    )
}

export default SkillsSector