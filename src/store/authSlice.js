import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth", 
    initialState: {
        user: null,
        isAuthenticated: false,
        wishList:[],
        number_of_items_in_wishlist:0,
        orders:[],
        number_of_orders:0
    },
    reducers: {
        setLogin(state, action) {
            state.user = action.payload.user;
            state.wishList = action.payload.wishList;
            state.number_of_items_in_wishlist = action.payload.wishList.length;
            state.orders = action.payload.orders;
            state.number_of_orders = action.payload.orders.length;
            state.isAuthenticated = true;
        },
        setLogout(state) {
            state.user = null;
            state.wishList = [];
            state.number_of_items_in_wishlist = 0;
            state.isAuthenticated = false;
            state.orders = [];
            state.number_of_orders = 0;
        },
        addToWishlistRedux(state, action) {
            state.wishList.push(action.payload);
            state.number_of_items_in_wishlist = state.wishList.length;
        },
        removeFromWishlistRedux(state, action) {
            state.wishList = state.wishList.filter(id => id !== action.payload);
            state.number_of_items_in_wishlist = state.wishList.length;
        },
        clearWishlist(state) {
            state.wishList = [];
            state.number_of_items_in_wishlist = 0;
        },
        addOrder(state, action) {
            state.orders.push(action.payload);
            state.number_of_orders = state.orders.length;
        }
    }
});

export const { setLogin, setLogout,addToWishlistRedux,removeFromWishlistRedux,clearWishlist,addOrder } = authSlice.actions;
export default authSlice.reducer;