import { createSlice} from "@reduxjs/toolkit"; 

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    productNumbers: 0,
    productData:[]
  },
  reducers: {   
    addProduct: (state,action) => {
      state.productData.push(action.payload);
      state.productNumbers = state.productData.length;
    } ,
    removeProduct:(state,action)=>{
        const { id, selectedColor } = action.payload;
       state.productData = state.productData.filter(item=>!(item.id === id && item.selectedColor === selectedColor));
       state.productNumbers = state.productData.length;
    },
    clearCart: (state) => {
      state.productData = [];
      state.productNumbers = 0;
    }
},
});

export const { addProduct,removeProduct,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
