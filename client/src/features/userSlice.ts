import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import API_ENDPOINTS from '../constants/apiEndPoints';

const initialState = {
  user: {},
  error: '',
};

export const getUserDetails = createAsyncThunk('user/getUser', () => {
  return axios
    .get(`http://localhost:5000/user${API_ENDPOINTS.getUser}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('JWT-TOKEN')}`,
      },
    })
    .then((response) => response.data);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.user = {};
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default userSlice.reducer;
