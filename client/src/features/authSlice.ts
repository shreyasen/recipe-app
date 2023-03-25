import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CredentialType as PostData } from '../pages/Signin';

const initialState = {
  isLoggenIn: false,
};

interface ResponseData {
  token: string;
}

export const authenticateUser = createAsyncThunk<ResponseData, PostData>(
  'user/authenticate',
  async (postData: PostData) => {
    const response = await axios.post<ResponseData>(
      'http://localhost:5000/user/auth',
      postData
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      Cookies.set('JWT-TOKEN', action.payload.token);
      state.isLoggenIn = true;
    });
    builder.addCase(authenticateUser.rejected, (state) => {
      state.isLoggenIn = false;
    });
  },
});

export default authSlice.reducer;
