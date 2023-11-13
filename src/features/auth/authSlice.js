import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { async } from "q";

export const postLogin = createAsyncThunk("login/postLogin", async ({email, password}) => {
    const response = await axios.post('https://paace-f178cafcae7b.nevacloud.io/api/login', {email, password})
    return response;
})

export const postRegister = createAsyncThunk("register/postRegister", async ({name, email, password}) => {
    const response = await axios.post('https://paace-f178cafcae7b.nevacloud.io/api/register', {name, email, password})
    return response;
})

export const getMe = createAsyncThunk('me/getMe', async ({config}) => {
    const response = await axios.get('https://paace-f178cafcae7b.nevacloud.io/api/user/me', config)
    return response;
})

export const getLogout = createAsyncThunk("logout/getLogout", async ({config}) => {
    const response = await axios.get('https://paace-f178cafcae7b.nevacloud.io/api/logout', config)
    return response;
})

const authAdapter = createEntityAdapter({
    selectId: (auth) => auth.id
})

const authSlice = createSlice({
    name: "auth",
    initialState: authAdapter.getInitialState(),
    extraReducers: (builder) => {
        builder
            .addCase(postLogin.fulfilled, (state, action) => {
                authAdapter.addOne(state, action.payload)
            })
            .addCase(getMe.fulfilled, (state, action) => {
                authAdapter.setOne(state, action.payload)
            })
            .addCase(postRegister.fulfilled, (state, action) =>{
                authAdapter.addOne(state, action.payload)
            })
            .addCase(getLogout.fulfilled, (state, action) => {
                authAdapter.removeAll(state, action.payload)
            })
    }
})

export const authSelectors = authAdapter.getSelectors((state) => state.auth)
export default authSlice.reducer;