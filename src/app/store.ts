import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tradeRoomReducer from 'app/slices/tradeRoomSlice';

export const store = configureStore({
  reducer: { tradeRoom: tradeRoomReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
