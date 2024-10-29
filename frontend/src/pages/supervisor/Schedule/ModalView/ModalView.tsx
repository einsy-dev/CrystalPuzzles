import { useState } from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import joinName from 'entities/profile/assets/joinName';
import { LessonI } from '@shared/api/lesson/lesson.interface';
import { Lesson } from '@shared/api';
import { Button, Modal } from '@shared/ui';
import styles from './ModalView.module.scss';

interface ModalViewProps {
	setActive?: (active: boolean) => void;
	closeModal?: () => void;
	data: LessonI[];
	day?: Date | string;
	setEditData: any;
}

export default function ModalView({
	setActive,
	closeModal,
	data,
	day,
	setEditData
}: ModalViewProps) {
	const [error, setError] = useState<string | null>(null);
	const [errModalActive, setErrModalActive] = useState(false);
	const [localData, setLocalData] = useState<LessonI[]>(data);
	// const [lesson, setData] = useState([]);
	const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<any | null>(null);

	const handleDelete = async (id: number) => {
		const [, e] = await Lesson.delete(id);
		if (e) {
			setError(e);
			setErrModalActive(true);
		} else {
			setLocalData((prevData) => prevData.filter((item) => item.id !== id));
		}
		setConfirmDeleteActive(false);
		setItemToDelete(null);
	};

	const requestDelete = (id: number) => {
		setItemToDelete(id);
		setConfirmDeleteActive(true);
	};

	// тестирование ошибки
	// const handleDelete = async (id: number) => {
	// 	const testError = true;
	// 	if (testError) {
	// 		setError('Ошибка: Не удалось удалить запись');
	// 		setErrModalActive(true);
	// 		return;
	// 	}

	// 	const [, e] = await Lesson.delete(id);
	// 	if (e) {
	// 		setError(e);
	// 		setErrModalActive(true);
	// 	} else {
	// 		setLocalData((prevData) => prevData.filter((item) => item.id !== id));
	// 	}
	// };

	return (
		<div className={styles.component}>
			<div onClick={closeModal}>x</div>

			<div className={styles.content}></div>
			<div>время</div>
			<div>площадка</div>
			<div>тренер</div>
			<div>Комментарий</div>

			{localData?.map((item: LessonI) => (
				<div key={uuid()}>
					<div>{moment(item.start).format('HH:mm')}</div>
					<div>
						<p>{item.space.name}</p>
					</div>
					<div>{joinName(item.trainer)}</div>
					<div>{item.trainer_comments}</div>
					<span onClick={() => setEditData(item)}>✎</span>
					<div onClick={() => requestDelete(item.id)}>x</div>
				</div>
			))}

			{error && (
				<Modal active={errModalActive} setActive={setErrModalActive}>
					<div className={styles.error_content}>
						<p>Ошибка при удалении.</p>
						<p>Запись не была удалена. Попробуйте позже.</p>
					</div>
				</Modal>
			)}

			{confirmDeleteActive && itemToDelete !== null && (
				<Modal active={confirmDeleteActive} setActive={setConfirmDeleteActive}>
					<div className={styles.confirm_modal}>
						<div>Вы действительно хотите удалить запись?</div>
						<div className={styles.btn_wrapper}>
							<Button
								title="Да"
								width="100px"
								onClick={() => handleDelete(itemToDelete)}
							/>
							<Button
								title="Нет"
								width="100px"
								onClick={() => setConfirmDeleteActive(false)}
							/>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
}
