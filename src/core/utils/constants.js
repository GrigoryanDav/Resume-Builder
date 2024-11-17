export const ROUTE_CONSTANTS = {
    LOGIN: '/login',
    REGISTER: '/register',
    CABINET: '/cabinet',
    RESUME_FORM: '/cabinet/resume-form',
    PROFILE_SECTION: '/cabinet/resume-form/profile-section',
    EDUCATION_SECTION: '/cabinet/resume-form/education-section',
    SKILLS_SECTOR: '/cabinet/resume-form/skills-sector',
    MINI_PROJECT: '/cabinet/resume-form/mini-project',
    SOCIAL: '/cabinet/resume-form/social',
}

export const FIRESTORE_PATH_NAMES = {
    REGISTERED_USERS: 'registered_users'
}

export const regexpValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/