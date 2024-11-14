import axios from 'axios';
import Cookies from 'js-cookie';
import { ErrorResponse } from 'react-router-dom';

declare global {
	interface Window {
		API_URL: string;
	}
}

class AxiosConfig {
	$authHost: any;
	$host: any;

	constructor() {
		this.init();
	}

	init() {
		axios.defaults.baseURL = process.env.REACT_APP_SERVER_API || window.API_URL;

		this.$authHost = axios.create();
		this.$host = axios.create();

		this.$authHost.interceptors.request.use((config: any) => {
			const token = Cookies.get('token');
			if (!token) return config;

			config.headers.authorization = `Bearer ${token}`;
			return config;
		});

		this.$authHost.interceptors.response.use(
			(res: Response) => res,
			async (err: ErrorResponse) => {
				if (
					err.status === 403 &&
					location.pathname !== '/login' &&
					location.pathname !== '/registration'
				) {
					location.href = '/login';
				}
			}
		);
	}
}

export default new AxiosConfig();
