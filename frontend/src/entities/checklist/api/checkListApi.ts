import { AxiosConfig } from '@api';
import { CheckListI } from './checkListApi.interface';

export class CheckListApi {
	#host = AxiosConfig.$authHost;
	async create(params: CheckListI) {
		const data = await this.#host
			.post(`/lesson/create-check`, params)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось создать чек-лист']);
		return data;
	}
}
