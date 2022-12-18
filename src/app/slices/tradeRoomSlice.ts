import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITradeData } from 'models/typescript';
import { fetchGetTradeRoom } from 'app/services/fetchGetTradeRoom';
export interface tradeRoomState {
  data: ITradeData;
  isLoading: boolean;
  isError: boolean;
}

const initialState: tradeRoomState = {
  data: {
    minDiscount: 0,
    wantedCost: 0,
    title: '',
    participants: [],
    startTradeTime: 0,
  },
  isLoading: true,
  isError: false,
};

export const getTradeRoomAsync = createAsyncThunk('tradeRoom/fetchGetTradeRoom', async () => {
  const response = await fetchGetTradeRoom();
  return response.data;
});

export const tradeRoomSlice = createSlice({
  name: 'tradeRoom',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTradeRoomAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTradeRoomAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(getTradeRoomAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default tradeRoomSlice.reducer;
