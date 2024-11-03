import { ReactNode } from 'react';
import { serverUrl } from '../assets';

export class Profile {
	id = null;
	_role = null;
	avatar = 0;
	photo: string | null = null;
	surname: ReactNode;
	firstname: ReactNode;
	birthday: string | number | readonly string[] | undefined;
	extensions: any;
	contact: string | number | readonly string[] | undefined;
	constructor(data?: any) {
		if (!data) return;
		const { role, avatar, photo, ...rest } = data;
		this._role = role;
		this.avatar = avatar;
		this.photo = photo ? serverUrl() + photo : null;
		Object.assign(this, rest);
	}
	get role() {
		return this._role;
	}
}
