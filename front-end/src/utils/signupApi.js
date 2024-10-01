import axios from 'axios';

const signupApi = async (signupData) => {
    try {
        const response = await axios.post('/api/users/sign-up', signupData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.token;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Failed to signup user");
        } else {
            throw error;
        }
    }
}

export default signupApi;