import { COOKIE_KEY, OBSERVER_KEY, REQUEST_TYPE } from '@/constants/app';
import { getCookie, setCookie } from '@/services/cookiesService';
import ObserverService from '@/services/observer';
import { encryptData } from '@/utils/crypto';
import { showNotificationError } from '@/utils/notification';
import axios from 'axios';

export type ServerAPIReqType = {
	url?: string;
	body?: any;
	auth?: string;
	method?: REQUEST_TYPE;
	timeOut?: number;
	isAuth?: boolean;
};

export type ClientAPITypeParam = ServerAPIReqType;

export const fetchData = async (
	param: ClientAPITypeParam
): Promise<{
	data: any;
	error?: any;
	messages: any;
}> => {
	try {
		let auth: string | null = '';
		const config: ClientAPITypeParam = {
			isAuth: true,
			method: REQUEST_TYPE.GET,
			...param,
		};

		if (config.method !== REQUEST_TYPE.GET && config.isAuth) {
			auth = await getCookie(COOKIE_KEY.Auth);

			if (!auth && config.isAuth) {
				const authRefresh = await getCookie(COOKIE_KEY.AuthRefresh);

				if (!authRefresh) {
					showNotificationError('Bạn đã hết hạn đăng nhập');
					ObserverService.emit(OBSERVER_KEY.LogOut, false);
					return {
						data: null,
						messages: 'fail',
						error: 'login expired',
					};
				}
				const newAuth = await fetchConfig({
					url: 'auth/refresh',
					isAuth: false,
					auth: authRefresh.toString(),
					method: REQUEST_TYPE.POST,
				});
				console.log({ newAuth });

				if (newAuth?.data?.token) {
					auth = newAuth?.data?.token;
					setCookie(COOKIE_KEY.Auth, newAuth?.data?.token);
				}
			}
		}
		return fetchConfig({ ...config, auth: auth || '' });
	} catch {
		return {
			data: null,
			messages: 'fail',
			error: 'server_error',
		};
	}
};

const fetchConfig = async ({ url = '', body = null, auth = '', method = REQUEST_TYPE.GET, timeOut = 70000 }: ServerAPIReqType): Promise<{ data: any; error?: any; messages: any }> => {
	const config: any = {
		baseURL: process.env.NEXT_PUBLIC_API_APP,
		url,
		// cache: isCache ? 'force-cache' : 'no-store',
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		signal: AbortSignal.timeout(timeOut),
	};

	if (body) {
		if (method !== REQUEST_TYPE.GET) {
			// config.data = {
			//   ...body,
			//   dataEncode: encodeDataMaxLength(body),
			// }
			config.data = {
				data: encryptData(body),
			};
		} else {
			config.params = body;
		}
	}

	if (auth) {
		config.headers.Authorization = auth;
	}

	return await axios
		.request(config)
		.then(async (response) => {
			if (response.status === 200) {
				return {
					data: response?.data?.data,
					messages: 'success',
				};
			}
			return {
				data: null,
				messages: 'fail',
			};
		})
		.catch((error) => {
			return {
				data: null,
				messages: 'fail',
				error,
			};
		});
};
export default fetchConfig;
