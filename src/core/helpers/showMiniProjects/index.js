import { ProjectOutlined } from '@ant-design/icons'

export const showMiniProjects = (miniProject) => {
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
                <h3><span><ProjectOutlined /></span>Project Name: {item.projectName}</h3>
                <h3><span><ProjectOutlined /></span>Tech Stack: {item.techStack}</h3>
                <h3><span><ProjectOutlined /></span>Description: {item.description}</h3>
            </div>
        )
    })
}