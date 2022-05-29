import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import BaseApi from '../services/BaseApi';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";


const initialState = {
  IsLoading:false,
IsError:false,
  AllShippment:[]
}

export const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
   
  },
  
  extraReducers: (builder) => {


    //post shippment case
    builder.addCase(postShippment.pending, (state) => {
      state.IsLoading = true;
    });
    builder.addCase(postShippment.fulfilled, (state, { payload }) => {

      // console.log("from builder",payload?.data)
      state.AllShippment = [...state.AllShippment,payload?.data];
      // state.AllShippment = [payload,...state.AllShippment];
      // state.AllShippment = state.AllShippment.push(payload)
      state.IsLoading = false;
      
            toast.success("Created Successfully!",{
              icon: "🚀"
              })

    });
    builder.addCase(postShippment.rejected, (state) => {
      state.IsLoading = false;
      state.IsError = true;
    });


//get all shippment case
    builder.addCase(getAllShippment.pending, (state) => {
      state.IsLoading = true;
    });
    builder.addCase(getAllShippment.fulfilled, (state, { payload }) => {
      state.IsLoading = false;
      state.AllShippment = payload;
    });
    builder.addCase(getAllShippment.rejected, (state) => {
      state.IsLoading = false;
      state.IsError = true;
    });

//Delete Shippment case
    builder.addCase(removeShippment.pending, (state) => {
      state.IsLoading = true;
  
    });
    builder.addCase(removeShippment.fulfilled, (state, { payload }) => {

      //show a deleted toast mesage if deletion is succesful
      toast.success("Deleted Successfully!",{
        icon: "🥺"
        })


      state.AllShippment = state.AllShippment.filter((shippment)=> shippment?._id !== payload?.data?._id)  ;
      state.IsLoading = false;
      state.IsDeleted = true
      
    });
    builder.addCase(removeShippment.rejected, (state) => {
      state.IsLoading = false;
      state.IsError = true;
    });
  },
})

// Action creators are generated for each case reducer function
export const shippmentSelector = (state) => state.shipping;

export default shippingSlice.reducer

export const postShippment = createAsyncThunk("post/shippment", async ({payload,usertoken}) => {

  const config = {
    headers: {
      Authorization : `Bearer ${usertoken}`,
      'Content-Type': 'application/json',
      }
  }

  const payloadJsoned = JSON.stringify(payload)

  try {

    const response = await axios.post(`${BaseApi}/shippment`,payloadJsoned,config);
// console.log("from api calls",response.data);
    return   await response.data;
  } catch (error) {
    return error;
  }
});



export const getAllShippment = createAsyncThunk("get/shippment", async ({userToken,userId}) => {
  // console.log("from reducer",payload,usertoken)

  const config = {
    headers: {
      Authorization : `Bearer ${userToken}`,
      'Content-Type': 'application/json',
      }
  }
  // console.log(response.data);
  try {

    const response = await axios.get(`${BaseApi}/shippment/byUser/${userId}`,config);
// console.log(response.data);
    return  await response?.data;
  } catch (error) {
    return error;
  }
});


export const removeShippment = createAsyncThunk("delete/shippment", async ({userToken,packageId}) => {
  // console.log("from reducer",payload,usertoken)

  const config = {
    headers: {
      Authorization : `Bearer ${userToken}`,
      'Content-Type': 'application/json',
      }
  }

  // console.log("From Shipmment Reducer ", userToken, packageId)
  try {

    const response = await axios.delete(`${BaseApi}/shippment/${packageId}`,config);
// console.log(response.data);
    return response?.data;
  } catch (error) {
    return error;
  }
});