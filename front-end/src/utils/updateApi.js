import axios from "axios";

const updateApi = async (updateData) => {
    try {
        console.log("Sending update data:", updateData); // Add logging
        const response = await axios.put('/api/users/high-score', updateData, {
            headers: {
                'Content-Type': "application/json"
            }
        });
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error response:", error.response); // Add logging
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message || "Failed to update");
        } else {
            throw error;
        }
    }
}

export default updateApi;