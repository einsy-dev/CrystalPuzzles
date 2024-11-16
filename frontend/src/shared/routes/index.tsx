import { studentRouter, supervisorRouter, trainerRouter } from '.';
import CheckInPage from '@checkIn/CheckIn';
import App from '@app/App';
import { ProfilePage, ErrorPage } from '@pages/shared';
import { redirect } from 'react-router-dom';
import ChangePass from '@pages/checkIn/changePass/ChangePass';
import { selectProfile } from '@app/providers/store';
import { useSelector } from 'react-redux';
import { Auth } from '@shared/api';

const MainRouter = (): any => {
	const { role } = useSelector(selectProfile);
	return [
		{
			path: '/',
			element: <App />,
			errorElement: <ErrorPage />,
			loader: async () => {
				if (!role) {
					await Auth.getProfile();
				} else if (role === 'admin') {
					return redirect('/login');
				}
				return null;
			},
			children: [
				{
					path: '/profile',
					element: <ProfilePage title="Мои личные данные" />
				},
				...(role === 'student'
					? studentRouter
					: role === 'trainer'
						? trainerRouter
						: role === 'supervisor'
							? supervisorRouter
							: [])
			]
		},
		{
			path: '/',
			loader: async () => {
				if (!role) {
					await Auth.getProfile();
				}
				if (role !== 'admin') {
					return redirect('/');
				}
				return null;
			},
			children: [
				{
					path: 'login',
					element: <CheckInPage login />
				},
				{
					path: 'registration',
					element: <CheckInPage />
				},
				{
					path: 'change-password',
					element: <ChangePass />
				}
			]
		}
	];
};

export default MainRouter;

export { default as supervisorRouter } from './supervisor';
export { default as trainerRouter } from './trainer';
export { default as studentRouter } from './student';
