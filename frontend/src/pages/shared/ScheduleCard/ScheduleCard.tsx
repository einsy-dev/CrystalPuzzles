import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import { deleteLesson } from '@app/providers/store';
import { Button, Modal } from '@shared/ui';
import joinName from 'entities/profile/assets/joinName';
import { ReactComponent as ClockIcon } from '@shared/assets/svg/clock.svg';
import { ReactComponent as Trash } from '@shared/assets/svg/trash.svg';
import { ReactComponent as Pencil } from '@shared/assets/svg/pencil.svg';
import { ModalEditLesson } from '@pages/supervisor/Schedule/ModalEditLesson/ModalEditLesson';
import { type LessonI } from 'entities/lesson/api/lessonApi.interface';
import { Lesson } from '@entities';
import styles from './ScheduleCard.module.scss';

interface ScheduleCardProps {
	className?: string;
	item: LessonI;
}

export const ScheduleCard = ({ item, className }: ScheduleCardProps) => {
	const dispatch = useDispatch();
	const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [errModalActive, setErrModalActive] = useState(false);
	const [editData, setEditData] = useState<LessonI | null>(null);

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
		<li className={classNames(styles.component, className)}>
			<div className={styles.trainer_wrapper}>
				<p>Тренер:</p>
				<p className={styles.trainer}>{joinName(item.trainer)}</p>
			</div>

			<div className={styles.place_wrapper}>
				<ClockIcon width={'26px'} />
				<div>
					<p className={styles.time}>{moment(item.start).format('HH:mm')}</p>
					<p className={styles.place}>{item.space.name} </p>
				</div>
			</div>

			<div className={styles.comment_wrapper}>
				<div className={styles.subtitle}>Комментарии:</div>
				<p className={styles.text}>{item.trainer_comments}</p>
			</div>
			<div className={styles.icon_wrapper}>
				<Pencil className={styles.icon} onClick={() => setEditData(item)} />
				<Trash
					className={styles.icon}
					onClick={() => setConfirmDeleteActive(true)}
				/>
			</div>

			{editData && (
				<ModalEditLesson closeModal={() => setEditData(null)} data={editData} />
			)}

			{confirmDeleteActive && (
				<div className={styles.confirm}>
					<div>
						<p className={styles.question}>
							Вы действительно хотите удалить запись?
						</p>
						<div className={styles.btn_wrapper}>
							<Button
								className={styles.btn}
								title="Удалить"
								width="180px"
								bgColor="dark"
								onClick={() => handleDelete(item.id)}
							/>
							<Button
								title="Отменить"
								width="180px"
								onClick={() => setConfirmDeleteActive(false)}
							/>
						</div>
					</div>
				</div>
			)}
			{error && (
				<Modal active={errModalActive} setActive={setErrModalActive}>
					<div className={styles.error_content}>
						<p>Ошибка при удалении.</p>
						<p>Запись не была удалена. Попробуйте позже.</p>
					</div>
				</Modal>
			)}
		</li>
	);
};
