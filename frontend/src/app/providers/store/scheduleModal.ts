import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface TrainerI {
	id: number;
	firstname: string;
	lastname: string;
	surname: string;
	photo: string;
	email: string;
	birthday: string;
	is_man: boolean;
	contact: string;
	role: string;
	avatar: number;
}

interface TrainerState {
	currentTrainer: TrainerI | null;
	currentDate: string | null;
}

const initialState: TrainerState = {
	currentTrainer: null,
	currentDate: null
};

const scheduleModalSlice = createSlice({
	name: 'scheduleModal',
	initialState,
	reducers: {
		setCurrentTrainer(state, action) {
			state.currentTrainer = action.payload;
		},
		setCurrentDate(state, action) {
			state.currentDate = action.payload;
		}
	}
});

export const getCurrentTrainer = (state: RootState) =>
	state.scheduleModal.currentTrainer;

export const getCurrentDate = (state: RootState) =>
	state.scheduleModal.currentDate;

export const { setCurrentTrainer, setCurrentDate } = scheduleModalSlice.actions;
export const scheduleModalSliceReducer = scheduleModalSlice.reducer;
