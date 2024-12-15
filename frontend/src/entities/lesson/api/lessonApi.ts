import { AxiosConfig } from '@api';
import {
	LessonCreateParams,
	LessonGetParams,
	LessonUpdateParams,
	StudentI
} from './lessonApi.interface';
import { store } from '@store';
import { setIsLoading } from '@app/providers/store/app';

@LogMethods
export class LessonApi {
	#host = AxiosConfig.$authHost;

	async create(params: LessonCreateParams) {
		const data = await this.#host
			.post(`/lesson/`, params)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось добавить урок']);
		return data;
	}

	async get(params: LessonGetParams) {
		const data = await this.#host
			.get(`/lesson/`, { params: params })
			.then(({ data: { records } }: any) => [records, null])
			.catch(() => [null, 'Не удалось получить уроки']);
		return data;
	}

	async getById(id: string | number) {
		const data = await this.#host
			.get('/lesson/' + id)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось получить урок']);
		return data;
	}

	async update(params: LessonUpdateParams) {
		const { id, ...rest } = params;
		const data = await this.#host
			.put('/lesson/' + id, rest)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось обновить урок']);
		return data;
	}

	async delete(id: string | number) {
		const data = await this.#host
			.delete('/lesson/' + id)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось удалить урок']);
		return data;
	}

	async addStudent(params: StudentI) {
		const { lesson_id, student_id } = params;
		const data = await this.#host
			.put('/lesson/add-user/' + lesson_id, student_id)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось добавить студента']);
		return data;
	}
	async removeStudent(params: StudentI) {
		const { lesson_id, student_id } = params;
		const data = await this.#host
			.put('/lesson/remove-user/' + lesson_id, student_id)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось добавить студента']);
		return data;
	}
}

function LogMethods(target: any) {
	const descriptors = Object.getOwnPropertyDescriptors(target.prototype);
	for (const [propName, descriptor] of Object.entries(descriptors)) {
		const isMethod =
			typeof descriptor.value == 'function' && propName != 'constructor';
		if (!isMethod) {
			continue;
		}
		LogMethod(target, propName, descriptor);
		Object.defineProperty(target.prototype, propName, descriptor);
	}
}

function LogMethod(
	target: any,
	propertyKey: string | symbol,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;
	descriptor.value = async function (...args: any[]) {
		// store.dispatch(setIsLoading(true));
		console.log(`Calling method  with arguments: ${JSON.stringify(args)}`);
		const result = await originalMethod.apply(this, args).finally(() => {
			// store.dispatch(setIsLoading(false));
			console.log('Method finished');
		});
		return result;
	};
}
