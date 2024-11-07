import { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker';
import moment from 'moment';
import { Lesson } from '@entities';
import { Button } from '@shared/ui';
import PlacesDropdown from 'features/placesDropdown/PlacesDropdown';
import { ReactComponent as CloseButton } from '@shared/assets/svg/close.svg';
import { updateLesson } from '@app/providers/store/schedule';
import { useDispatch } from 'react-redux';
import { getLessons } from '@app/providers/store/service/getLessons';
import { useSelector } from 'react-redux';
import {
	getCurrentDate,
	getCurrentTrainer
} from '@app/providers/store/scheduleModal';
import TrainersDropdown from 'features/trainersDropdown/TrainersDropdown';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import styles from './ModalEditLesson.module.scss';

interface ModalEditLessonProps {
	day?: any;
	data: any;
	closeModal: () => void;
}

export const ModalEditLesson = ({
	closeModal,
	data,
	day
}: ModalEditLessonProps) => {
	const dispatch = useDispatch();
	const currentTrainer = useSelector(getCurrentTrainer);
	const trainer_id = currentTrainer?.id;
	const currentDate = useSelector(getCurrentDate);

	const [editLesson, setEditLesson] = useState({
		id: data?.id,
		space_id: data?.space?.id || null,
		trainer_id: data?.trainer?.id || null,
		trainer_comments: data?.trainer_comments || '',
		start: data?.start || moment(day).set({ hour: 12, minute: 0 }).format()
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);


	useEffect(() => {
		if (data) {
			setEditLesson({
				id: data.id,
				space_id: data.space?.id,
				trainer_id: data.trainer?.id,
				trainer_comments: data.trainer_comments,
				start: data.start
			});
		}
	}, [data]);

	async function handleUpdate() {
		const [updatedLesson, err] = await Lesson.update({ ...editLesson });
		if (err) {
			setErrorMessage('Не удалось обновить урок. Попробуйте ещё раз');
			return;
		}
		dispatch(updateLesson(updatedLesson));
		closeModal();
		getLessons(trainer_id!, moment(currentDate));
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<button className={styles.close_btn} onClick={closeModal}>
					<CloseButton className={styles.icon} width={16} />
				</button>
			</header>
			<main className={styles.main}>
				<TrainersDropdown
					state={editLesson.trainer_id}
					setState={(id: string) =>
						setEditLesson({ ...editLesson, trainer_id: id })
					}
					className={styles.trainer}
					single
				/>
				<PlacesDropdown
					state={editLesson.space_id}
					setState={(id: string) =>
						setEditLesson({ ...editLesson, space_id: id })
					}
					className={styles.place}
					single
				/>
				<div className={styles.time_wrapper}>
					<TimePicker
						className={styles.time}
						maxDetail="minute"
						onChange={(time: string | null) => {
							if (time) {
								const [hour, minute] = time
									.split(':')
									.map((unit) => parseInt(unit, 10));
								setEditLesson((prev) => ({
									...prev,
									start: moment(day).set({ hour, minute }).format()
								}));
							}
						}}
						value={moment(editLesson.start).format('HH:mm')}
						format="HH:mm"
						locale="sv-sv"
						disableClock
						clearIcon={null}
					/>
				</div>
				<textarea
					className={styles.textarea}
					value={editLesson.trainer_comments || ''}
					onChange={(e) =>
						setEditLesson((prev) => ({
							...prev,
							trainer_comments: e.target.value
						}))
					}
				/>
				{errorMessage && <div className={styles.error}>{errorMessage}</div>}
				<Button className={styles.submit} onClick={handleUpdate} bgColor="dark">
					Изменить
				</Button>
			</main>
		</div>
	);
};
