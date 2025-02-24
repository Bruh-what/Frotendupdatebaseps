import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabaseClient";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: `${formData.firstName} ${formData.lastName}` },
        },
      });
      if (error) {
        return rejectWithValue(error.message);
      }
      const user = data.user;
      if (!user) {
        return rejectWithValue("User signup failed. Please try again.");
      }
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ uid: user.id, role: formData.role }]);

      if (profileError) {
        return rejectWithValue(profileError.message);
      }

      return { message: "Signup successful! Please check your email." };
    } catch (error) {
      return rejectWithValue(
        error.message || "Something went wrong. Please try again."
      );
    }
  }
);
export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return rejectWithValue(error.message);

      const user = data.user;
      if (!user) return rejectWithValue("User not found");

      // Fetch role from the 'profiles' table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("uid", user.id)
        .single();

      if (profileError) return rejectWithValue(profileError.message);

      return { user, role: profile.role, message: "Sign in successful!" };
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong.");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return rejectWithValue(error.message);
      return true; // Logout successful
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed. Try again.");
    }
  }
);
