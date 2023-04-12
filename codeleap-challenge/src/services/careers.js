import api from "./api";

export const createPost = async (data) => {
    try {
        const response = await api.post(`/careers/`, data);
        return response;
    } catch (err) {
        return err;
    }
};

export const getPost = async () => {
    try {
        const response = await api.get(`/careers/`);
        return response;
    } catch (err) {
        return err;
    }
};

export const deletePost = async (id) => {
    try {
        const response = await api.delete(`/careers/${id}/`);
        return response;
    } catch (err) {
        return err;
    }
};

export const updatePost = async (data) => {
    try {
        const response = await api.patch(`/careers/${data.id}/`, data.data);
        return response;
    } catch (err) {
        return err;
    }
};