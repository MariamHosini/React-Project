import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth", 
    initialState: {
        user: null,
        isAuthenticated: false,
        wishList:[]
    },
    reducers: {
        setLogin(state, action) {
            state.user = action.payload.user;
            state.wishList = action.payload.wishList;
            state.isAuthenticated = true;
        },
        setLogout(state) {
            state.user = null;
            state.wishList = [];
            state.isAuthenticated = false;
        },
        addToWishlistRedux(state, action) {
            state.wishList.push(action.payload);
        },
        removeFromWishlistRedux(state, action) {
            state.wishList = state.wishList.filter(id => id !== action.payload);
        }
    }
});

export const { setLogin, setLogout,addToWishlistRedux,removeFromWishlistRedux } = authSlice.actions;
export default authSlice.reducer;