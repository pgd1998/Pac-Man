import axios from "axios";

const updateApi = async (updateData) => {
    try {
        const response = await apiClient.put('/api/users/high-score', updateData);

        return response.data.highScore;
    } catch (error) {
        if (error.code === "ECONNABORTED") {
            throw new Error("Request timed out. Please try again.");
        }
        if (!error.response) {
            throw new Error("Network error. Please check your connection.");
        }
        console.error("Error response:", error.response);
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message || "Failed to update");
        } else {
            throw error;
        }
    }
}

export default updateApi;