import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authApi from './authApi'
import { toast } from 'react-hot-toast'

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authApi.login(credentials)
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const checkTokenExpiration = createAsyncThunk(
  'auth/checkTokenExpiration',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('Checking token expiration...');
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Decode the token to check expiration
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;

      console.log(decodedToken);
      
      if (decodedToken.exp < currentTime) {
        // Token is expired
        dispatch(logout());
        throw new Error('Token expired');
      }

      // Token is valid
      return decodedToken;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.profile(); // No need for extra headers
      return response.data; // Return the response
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch profile');
    }
  }
);

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await authApi.register(data)
    return response.data
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

// Similar thunks for register, passwordReset, changePassword

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.user = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.access
        localStorage.setItem('token', action.payload.access)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        toast.error(action.payload?.detail || 'Login failed')
      })
      // register
      .addCase(register.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.access
        localStorage.setItem('token', action.payload.access)
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        toast.error(action.payload?.detail || 'Registration failed')
      })

      // fetchProfile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload?.detail || 'Failed to fetch profile')
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer