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
    USER_RESUME: '/cabinet/resume',
    USER_RESUME_1: '/cabinet/resume/1',
    USER_RESUME_2: '/cabinet/resume/2',
    USER_RESUME_3: '/cabinet/resume/3,'
}

export const FIRESTORE_PATH_NAMES = {
    REGISTERED_USERS: 'registered_users'
}

export const regexpValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

export const SECTION_KEYS = {
    '/cabinet/resume-form/profile-section': 'profile',
    '/cabinet/resume-form/education-section': 'education',
    '/cabinet/resume-form/skills-sector': 'skills',
    '/cabinet/resume-form/mini-project': 'miniProject',
    '/cabinet/resume-form/social': 'social',
};
