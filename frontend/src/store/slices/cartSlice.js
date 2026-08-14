import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

// Tải giỏ hàng từ server
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/carts');
      return response.data.items || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Không thể tải giỏ hàng.');
    }
  }
);

// Thêm món vào giỏ hàng
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
    try {
      await API.post('/carts/add', { productId, quantity });
      dispatch(fetchCart()); // Tải lại giỏ hàng sau khi thêm để đồng bộ thông tin
      return { productId, quantity };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Không thể thêm sản phẩm.');
    }
  }
);

// Cập nhật số lượng
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
    try {
      await API.put('/carts/update', { productId, quantity });
      dispatch(fetchCart());
      return { productId, quantity };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Không thể cập nhật số lượng.');
    }
  }
);

// Xóa món khỏi giỏ hàng
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      await API.delete(`/carts/remove/${productId}`);
      dispatch(fetchCart());
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Không thể xóa sản phẩm khỏi giỏ hàng.');
    }
  }
);

// Xóa sạch giỏ hàng
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await API.delete('/carts/clear');
      dispatch(fetchCart());
      return [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Không thể xóa sạch giỏ hàng.');
    }
  }
);

const initialState = {
  items: [], // Mỗi item chứa { id, cartId, productId, quantity, product: {...} }
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.items = [];
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
