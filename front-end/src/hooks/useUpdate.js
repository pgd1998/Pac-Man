import updateApi from "../utils/updateApi";

const useUpdate = () => {
    const updateHighScore = async (updateData) => {
        try {
            const response = await updateApi(updateData);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return updateHighScore;
};

export default useUpdate;