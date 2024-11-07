import { $authHost } from '../../../shared/api/axios.instances';
import { CheckListI } from './checkListApi.interface';

export class CheckListApi {
	#host = $authHost;
	async create(params: CheckListI) {
		const data = await this.#host
			.post(`/lesson/create-check`, params)
			.then(({ data }) => [data, null])
			.catch(() => [null, 'Не удалось создать чек-лист']);
		return data;
	}
}
