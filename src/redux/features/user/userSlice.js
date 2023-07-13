import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
            localStorage.setItem("auth", JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.clear();
        }
    },
})

export default userSlice.reducer;
export const { setUser, logoutUser } = userSlice.actions;