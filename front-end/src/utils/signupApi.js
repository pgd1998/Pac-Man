const signupApi = async (signupData) => {
    try {
        const response = await apiClient.post('/api/users/sign-up', signupData);
        
        return response.data;
    } catch (error) {
        if (error.code === "ECONNABORTED") {
            throw new Error("Request timed out. Please try again.");
        }
        if (!error.response) {
            throw new Error("Network error. Please check your connection.");
        }
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Failed to signup user");
        } else {
            throw error;
        }
    }
}

export default signupApi;