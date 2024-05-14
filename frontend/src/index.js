import React, { useMemo } from 'react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from '@app/store';
import createRouter from './routes';
import { selectUser } from '@entities/User/slice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Root />
		</Provider>
	</React.StrictMode>
);

function Root() {
	const { role } = useSelector(selectUser);
	const router = useMemo(() => {
		return createRouter(role);
	}, [role]);
	return <RouterProvider router={router} />;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
