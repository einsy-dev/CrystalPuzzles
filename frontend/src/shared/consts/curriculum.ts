import { v4 as uuid } from 'uuid';

interface CurriculumI {
	title: string;
	link: string;
	id: string;
	shortcut: string;
}

export const curriculum: CurriculumI[] = [
	{ title: 'сентябрь', link: '#', id: uuid(), shortcut: 'сент.' },
	{ title: 'октябрь', link: '#', id: uuid(), shortcut: 'окт.' },
	{ title: 'ноябрь', link: '#', id: uuid(), shortcut: 'нояб.' },
	{ title: 'декабрь', link: '#', id: uuid(), shortcut: 'дек.' },
	{ title: 'январь', link: '#', id: uuid(), shortcut: 'янв.' },
	{ title: 'февраль', link: '#', id: uuid(), shortcut: 'февр.' },
	{ title: 'март', link: '#', id: uuid(), shortcut: 'март' },
	{ title: 'апрель', link: '#', id: uuid(), shortcut: 'апр.' },
	{ title: 'май', link: '#', id: uuid(), shortcut: 'май' }
];
