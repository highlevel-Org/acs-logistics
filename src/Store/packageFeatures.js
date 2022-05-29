import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import BaseApi from '../services/BaseApi';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  IsLoading:false,

packageShipment:{},
IsError:false,

}

export const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
   
  },
  
  extraReducers: (builder) => {


    //update shippment case
    builder.addCase(updateShippment.pending, (state) => {
      state.IsLoading = true;
    });
    builder.addCase(updateShippment.fulfilled, (state, { payload }) => {

      toast.success("updated Successfully!",{
        icon: "🚀"
        })
      state.packageShipment = payload;
      state.IsLoading = false;
      state.IsSuccess=true;
    });
    builder.addCase(updateShippment.rejected, (state) => {
      state.IsLoading = false;
      state.IsError = true;
    });


//get Single shippment case
    builder.addCase(getShippment.pending, (state) => {
      state.IsLoading = true;
    });
    builder.addCase(getShippment.fulfilled, (state, { payload }) => {
        state.packageShipment = payload;
        state.IsLoading = false;
    });
    builder.addCase(getShippment.rejected, (state) => {
      state.IsLoading = false;
      state.IsError = true;
    });

//Delete Shippment case
    builder.addCase(removePackage.pending, (state) => {
      state.IsLoading = true;
  
    });
    builder.addCase(removePackage.fulfilled, (state, { payload }) => {

      //show a deleted toast mesage if deletion is succesful
      toast.success("Deleted Successfully!",{
        icon: "🚀"
        })

      state.packageShipment = payload  ;
      state.IsLoading = false;
    
      
    });
    builder.addCase(removePackage.rejected, (state) => {
      state.IsLoading = false;
      state.IsError = true;
    });
  },
})

// Action creators are generated for each case reducer function
export const packageSelector = (state) => state.package;

export default packageSlice.reducer

export const updateShippment = createAsyncThunk("update/package", async ({payload,usertoken,id}) => {
  // console.log("from reducer",payload,usertoken)
  const config = {
    headers: {
      Authorization : `Bearer ${usertoken}`,
      'Content-Type': 'application/json',
      }
  }

  const payloadJsoned = JSON.stringify(payload)

  try {

    const response = await axios.put(`${BaseApi}/shippment/${id}`,payloadJsoned,config);
// console.log(response.data);
    return await response.data;
  } catch (error) {
    return error;
  }
});



export const getShippment = createAsyncThunk("get/package", async ({usertoken,id}) => {
  // console.log("from reducer",payload,usertoken)

  const config = {
    headers: {
      Authorization : `Bearer ${usertoken}`,
      'Content-Type': 'application/json',
      }
  }
  try {

    const response = await axios.get(`${BaseApi}/shippment/${id}`,config);
// console.log(response.data);
    return  await response?.data;
  } catch (error) {
    return error;
  }
});


export const removePackage = createAsyncThunk("delete/package", async({usertoken,id}) => {
  // console.log("from reducer",payload,usertoken)

  const config = {
    headers: {
      Authorization : `Bearer ${usertoken}`,
      'Content-Type': 'application/json',
      }
  }

//   console.log("From Shipmment Reducer ", usertoken, id)
  try {

    const response = await axios.delete(`${BaseApi}/shippment/${id}`,config);
// console.log(response.data);
    return await response?.data;
  } catch (error) {
    return error;
  }
});