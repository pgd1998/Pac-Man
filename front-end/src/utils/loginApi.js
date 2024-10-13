import axios from "axios";

const loginApi = async (loginData) => {
    try {
        const response = await axios.post("/api/users/login", loginData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message||"Failed to login")
        } else {
            throw error;
        }
    }
}

export default loginApi;