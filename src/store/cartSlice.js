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
        const { id, selectedColor,numberOfProduct } = action.payload;
       state.productData = state.productData
       .filter(item=>!(item.id === id && item.selectedColor?.hex_value === selectedColor?.hex_value&&item.numberOfProduct===numberOfProduct));
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
