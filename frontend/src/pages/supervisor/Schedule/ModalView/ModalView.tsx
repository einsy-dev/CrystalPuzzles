import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Lesson } from '@shared/api';
import { Modal } from '@shared/ui';
import { deleteLesson, selectLessons } from '@app/providers/store/schedule';
import { getCurrentDate } from '@app/providers/store';
import { ModalEditLesson } from '../ModalEditLesson/ModalEditLesson';
import { ScheduleCard } from '@pages/shared/ScheduleCard/ScheduleCard';
import { type LessonI } from '@shared/api/lesson/lesson.interface';
import styles from './ModalView.module.scss';

interface ModalViewProps {
	setActive?: (active: boolean) => void;
	closeModal?: () => void;
	data?: LessonI[];
	day?: Date | string;
}

export const ModalView = ({ closeModal, data }: ModalViewProps) => {
	const dispatch = useDispatch();
	const lessons: Record<string, LessonI[]> = useSelector(selectLessons);
	const cutternDate = useSelector(getCurrentDate);
	const [editData, setEditData] = useState<LessonI | null>(null);
	const [errModalActive, setErrModalActive] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDelete = async (id: number) => {
		const [, e] = await Lesson.delete(id);
		if (e) {
			setError(e);
			setErrModalActive(true);
		} else {
			dispatch(deleteLesson(id));
		}
	};

	return (
		<div className={styles.component}>
			<div onClick={closeModal}>x</div>

			<header>{/* сюда встанут tabs */}</header>
			<ul className={styles.cards_content}>
				{lessons[cutternDate as string].map((item) => (
					<ScheduleCard
						key={item.id}
						item={item}
						setEditData={() => setEditData(item)}
						requestDelete={() => handleDelete(item.id)}
					/>
				))}
			</ul>

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
		</div>
	);
};
