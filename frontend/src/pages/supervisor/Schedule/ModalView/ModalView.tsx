import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import joinName from 'entities/profile/assets/joinName';
import { LessonI } from 'entities/lesson/api/lesson.interface';
import { Lesson } from '@shared/api';
import { Button, Modal } from '@shared/ui';
import { deleteLesson, selectLessons } from '@app/providers/store/schedule';
import { getCurrentDate } from '@app/providers/store';
import { ModalEditLesson } from '../ModalEditLesson/ModalEditLesson';
import styles from './ModalView.module.scss';

interface ModalViewProps {
	setActive?: (active: boolean) => void;
	closeModal?: () => void;
	data?: LessonI[];
	day?: Date | string;
}

export const ModalView = ({ closeModal, data }: ModalViewProps) => {
	const dispatch = useDispatch();
	const lessons = useSelector(selectLessons);
	const cutternDate = useSelector(getCurrentDate);
	const [editData, setEditData] = useState(null);

	const [localData, setLocalData] = useState<any>(data);

	const [itemToDelete, setItemToDelete] = useState<any | null>(null);
	const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);
	const [errModalActive, setErrModalActive] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDelete = async (id: number) => {
		const [, e] = await Lesson.delete(id);
		if (e) {
			setError(e);
			setErrModalActive(true);
		} else {
			setLocalData((prevData: any) =>
				prevData.filter((item: any) => item.id !== id)
			);
			dispatch(deleteLesson(id));
		}
		setConfirmDeleteActive(false);
		setItemToDelete(null);
	};

	const requestDelete = useCallback((id: number) => {
		setItemToDelete(id);
		setConfirmDeleteActive(true);
	}, []);

	return (
		<div className={styles.component}>
			<div onClick={closeModal}>x</div>

			<div className={styles.content}>
				<div>тренер</div>
				<div>время</div>
				<div>площадка</div>
				<div>Комментарий</div>
			</div>
			{lessons[cutternDate as string].map((item: any) => (
				<div key={item.id}>
					<div>{joinName(item.trainer)}</div>
					<div>{moment(item.start).format('HH:mm')}</div>
					<div>
						<p>{item.space.name}</p>
					</div>
					<div>{item.trainer_comments}</div>
					<span onClick={() => setEditData(item)}>✎</span>
					<div onClick={() => requestDelete(item.id)}>x</div>
				</div>
			))}

			{editData && (
				<ModalEditLesson closeModal={() => setEditData(null)} data={editData} />
			)}

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
};
