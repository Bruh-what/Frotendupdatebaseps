import { createSlice } from '@reduxjs/toolkit';
import { signupUser, signinUser, logoutUser } from './auth.action';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    IsRegisterLoading: false,
    IsRegisterFullfilled: false,
    IsRegisterRejected: false,

    IsLoginLoading: false,
    IsLoginFullfilled: false,
    IsLoginRejected: false,

    IsLogoutLoading: false,
    IsLogoutFullfilled: false,
    IsLogoutRejected: false,

    success: null,
    error: null,
    user: null,

    isProfileIncomplete: false,
  },
  reducers: {
    clearAuthMessages: (state) => {
      state.IsRegisterLoading = false;
      state.IsRegisterFullfilled = false;
      state.IsRegisterRejected = false;
      state.success = null;
      state.error = null;
      state.IsLoginLoading = false;
      state.IsLoginFullfilled = false;
      state.IsLoginRejected = false;
    },
    setProfileIncomplete: (state, action) => {
      state.isProfileIncomplete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.IsRegisterLoading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.IsRegisterFullfilled = true;
      state.IsRegisterLoading = false;
      state.success = action.payload.message;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.IsRegisterLoading = false;
      state.IsRegisterFullfilled = false;
      state.IsRegisterRejected = true;
      state.error = action.payload;
    });
    // signin user
    builder.addCase(signinUser.pending, (state) => {
      state.IsLoginLoading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(signinUser.fulfilled, (state, action) => {
      state.IsLoginFullfilled = true;
      state.IsLoginLoading = false;
      state.user = action.payload.user;
      state.success = action.payload.message;
    });
    builder.addCase(signinUser.rejected, (state, action) => {
      state.IsLoginLoading = false;
      state.IsLoginFullfilled = false;
      state.IsLoginRejected = true;
      state.error = action.payload;
    });
    //logout user
    builder.addCase(logoutUser.pending, (state) => {
      state.IsLogoutLoading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      console.log(state);

      state.IsLogoutFullfilled = true;
      state.IsLogoutLoading = false;
      state.success = action.payload.message;
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      console.log(state);

      state.IsLogoutLoading = false;
      state.IsLogoutRejected = true;
      state.error = action.payload;
    });
  },
});

export const { clearAuthMessages, setProfileIncomplete } = authSlice.actions;
export default authSlice.reducer;
