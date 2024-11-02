import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { scheduleSlice } from './schedule';
import { profileSlice } from './profile';
import { appSlice } from './app';
import { scheduleModalSlice } from './scheduleModal';

const mainReducer = combineSlices(
	profileSlice,
	appSlice,
	scheduleSlice,
	scheduleModalSlice
);

const store = configureStore({
	reducer: mainReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
