import { createSlice} from "@reduxjs/toolkit"; 

const spinnerSlice = createSlice({
  name: 'spinnerSlice',
  initialState: {
    mode: false,
  },
  reducers: {   
    startSpinner: (state) => {
      state.mode = true;
      
    } ,
    stopSpinner:(state)=>{
        state.mode = false;
    }
},
});

export const { startSpinner,stopSpinner } = spinnerSlice.actions;

export default spinnerSlice.reducer;
