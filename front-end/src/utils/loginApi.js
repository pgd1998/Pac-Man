import apiClient from "./apiClient";

const loginApi = async (loginData) => {
    try {
        const response = await apiClient.post("/api/users/login", loginData);
        return response.data;
    } catch (error) {
        if (error.code === "ECONNABORTED") {
            throw new Error("Request timed out. Please try again.");
        }
        if (!error.response) {
            throw new Error("Network error. Please check your connection.");
        }
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message || "Failed to login");
        } else {
            throw error;
        }
    }
};

export default loginApi;