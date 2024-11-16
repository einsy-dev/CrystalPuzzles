import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { scheduleSliceReducer } from './schedule';
import { profileSliceReducer } from './profile';
import { appSliceReducer } from './app';
import { scheduleModalSliceReducer } from './scheduleModal';
import { notificationSliceReducer } from './notification';

const mainReducer = combineSlices({
	app: appSliceReducer,
	profile: profileSliceReducer,
	schedule: scheduleSliceReducer,
	scheduleModal: scheduleModalSliceReducer,
	notification: notificationSliceReducer
});

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
