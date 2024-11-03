import { createSlice } from '@reduxjs/toolkit';
import { Profile } from '@entities';
import { Auth } from '@api';
import { RootState } from './store';

const [profile, err] = await Auth.getProfile();

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		profile: err ? new Profile() : new Profile(profile)
	},
	reducers: {
		setProfile: (state, action) => {
			state.profile = action.payload;
		}
	}
});

export const selectProfile = (state: RootState) => state.profile.profile;

export const { setProfile } = profileSlice.actions;
export const profileSliceReducer = profileSlice.reducer;
