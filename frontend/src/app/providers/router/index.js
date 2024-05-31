import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '@app/App';
import {
	checkInRouter,
	supervisorRouter,
	studentRouter,
	trainerRouter
} from '@shared/const/routes';
import { requestForToken } from '@shared/config/firebase';

function createRouter(role) {
	return createBrowserRouter([
		{
			path: '/',
			element: <App />,
			loader: () => {
				if (!role) return redirect('/login');
				requestForToken();
				return null;
			},
			children:
				(role === 'student' && studentRouter) ||
				(role === 'supervisor' && supervisorRouter) ||
				(role === 'trainer' && trainerRouter)
		},
		{
			path: '/',
			element: <App check_in />,
			children: checkInRouter
		},
		{
			path: '*',
			loader: () => redirect('/')
		}
	]);
}

export { createRouter };
