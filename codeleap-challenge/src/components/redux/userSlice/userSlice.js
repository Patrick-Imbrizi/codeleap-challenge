import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        username: null,
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = initialState.user;
        }
    }
});