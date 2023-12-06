import apiClient from "../apiClient/apiClient.js";

export const getAllPortfolios = async (id) => {
    try {
        return await apiClient.get(`/${id}`);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getPortfolio = async (id) => {
    try {
        return await apiClient.get(`/workEntry/${id}`);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const saveWorkEntry = async (data, file) => {
    try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }
        formData.append('file', file);

        const headers = {
            'Content-Type': 'multipart/form-data',
        };

        return await apiClient.post("/save", formData, { headers } );
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const deleteWorkEntry = async (id) => {
    try {
        return await apiClient.delete(`/${id}`);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const updateWorkEntry = async (id, data) => {
    try {
        return await apiClient.put(`/${id}`, data);
    } catch (err) {
        console.log(err);
        throw err;
    }
};