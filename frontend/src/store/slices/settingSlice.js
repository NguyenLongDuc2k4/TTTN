import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

// Lấy settings của quán
export const fetchSettings = createAsyncThunk(
  'setting/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/settings');
      return response.data;
    } catch (error) {
      return rejectWithValue('Không thể tải cấu hình giao diện.');
    }
  }
);

// Cập nhật settings (dành cho Admin)
export const updateSettingsThunk = createAsyncThunk(
  'setting/updateSettings',
  async (settingsData, { dispatch, rejectWithValue }) => {
    try {
      await API.put('/settings', settingsData);
      dispatch(fetchSettings());
      return settingsData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Cập nhật cấu hình thất bại.');
    }
  }
);

const initialState = {
  config: {
    logo: '',
    themeColor: '#FF6B6B',
    showNewProducts: 'true',
    showBestProducts: 'true',
    showSaleProducts: 'true',
    showNews: 'true',
  },
  loading: false,
  error: null,
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default settingSlice.reducer;
