import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: number,
    name: string,
    email: string
}

type UserRole = "user" | "admin"

interface initialStateType {
    user: User | null,
    isAuthenticated: boolean,
    role: UserRole | null
}

const initialState: initialStateType = {
    user: null,
    isAuthenticated: false,
    role: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ user: User, role: UserRole }>) {
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.isAuthenticated = true;
        },
        updateUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null
            state.role = null
            state.isAuthenticated = false;
        }
    }
})

export const { login, logout, updateUser } = authSlice.actions
export default authSlice.reducer