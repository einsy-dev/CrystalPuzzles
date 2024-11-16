import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		title: '',
		message: '',
		img: '',
		type: ''
	},
	reducers: {
		setNotification: (state, action) => {
			state = action.payload;
		}
	}
});

export const selectNotification = (state: RootState) => state.notification;

export const { setNotification } = notificationSlice.actions;
export const notificationSliceReducer = notificationSlice.reducer;
