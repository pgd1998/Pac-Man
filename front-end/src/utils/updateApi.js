import axios from "axios";

const updateApi = async (updateData) => {
    try {
        const response = await axios.put('/api/users/high-score', updateData, {
            headers: {
                'Content-Type': "application/json"
            }
        });
        return response.data.highScore;
    } catch (error) {
        console.error("Error response:", error.response);
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message || "Failed to update");
        } else {
            throw error;
        }
    }
}

export default updateApi;