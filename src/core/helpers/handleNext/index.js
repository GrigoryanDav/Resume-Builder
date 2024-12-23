import { updateFormData } from "../../../state-managment/slices/formData";

export const handleNextHelper = async (form, formName, targetRoute, dispatch, navigate) => {
    try {
        const values = await form.validateFields();
        dispatch(updateFormData({ formName, values }));
        navigate(targetRoute);
    } catch (error) {
        console.error("Validation failed:", error);
    }
};
