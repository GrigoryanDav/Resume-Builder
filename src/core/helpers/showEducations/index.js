import { PlusOutlined } from '@ant-design/icons'

export const showEducations = (education) => {
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