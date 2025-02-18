import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adsApi from './adsApi';
import { toast } from 'react-hot-toast';

export const fetchAds = createAsyncThunk('ads/fetchAds', async (_, { rejectWithValue }) => {
  try {
    const response = await adsApi.fetchAds();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to fetch ads');
  }
});

export const fetchAd = createAsyncThunk('ads/fetchAd', async (id, { rejectWithValue }) => {
  try {
    const response = await adsApi.fetchAd(id);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to fetch ad');
  }
});

export const createAd = createAsyncThunk('ads/createAd', async (data, { rejectWithValue }) => {
  try {
    const response = await adsApi.createAd(data);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to create ad');
  }
});

export const updateAd = createAsyncThunk('ads/updateAd', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await adsApi.updateAd(id, data);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to update ad');
  }
});

export const deleteAd = createAsyncThunk('ads/deleteAd', async (id, { rejectWithValue }) => {
    try {
        await adsApi.deleteAd(id);
        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data || 'Failed to delete ad');
    }
    }); 

const adsSlice = createSlice({
    name: 'ads',
    initialState: {
        ads: [],
        ad: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchAds
            .addCase(fetchAds.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAds.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ads = action.payload;
            })
            .addCase(fetchAds.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error(action.payload || 'Failed to fetch ads');
            })
            // fetchAd
            .addCase(fetchAd.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAd.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ad = action.payload;
            })
            .addCase(fetchAd.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error(action.payload || 'Failed to fetch ad');
            })

            // createAd
            .addCase(createAd.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createAd.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ads.push(action.payload);
            })
            .addCase(createAd.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error(action.payload || 'Failed to create ad');
            })
            // updateAd
            .addCase(updateAd.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAd.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ads = state.ads.map((ad) =>
                    ad.id === action.payload.id ? action.payload : ad
                );
            })
            .addCase(updateAd.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error(action.payload || 'Failed to update ad');
            })
            // deleteAd
            .addCase(deleteAd.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteAd.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ads = state.ads.filter((ad) => ad.id !== action.payload);
            })
            .addCase(deleteAd.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                toast.error(action.payload || 'Failed to delete ad');
            });
    },
});

export const { clearError } = adsSlice.actions;
export default adsSlice.reducer;