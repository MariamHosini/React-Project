import { createSlice} from "@reduxjs/toolkit"; 

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    productNumbers: 0,
    productData:[]
  },
  reducers: {   
    addProduct: (state,action) => {
      const { id, numberOfProduct ,selectedColor} = action.payload;
      const old_product = state.productData
       .find(item=>(item.id === id && item.selectedColor?.hex_value === selectedColor?.hex_value));
       if(old_product){
          old_product.numberOfProduct = Number(old_product.numberOfProduct) + Number(numberOfProduct);
       }
     else{
       state.productData.push(action.payload);
      state.productNumbers = state.productData.length;
     }
    } ,
    updateQuantity: (state, action) => {
      const { id, numberOfProduct , selectedColor} = action.payload;
      const item = state.productData.find(p => p.id === id && p.selectedColor?.hex_value === selectedColor?.hex_value);
      if (item && numberOfProduct >= 1) { 
        item.numberOfProduct = Number(numberOfProduct) ;
      }
    },
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

export const { addProduct,removeProduct,clearCart,updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
