import { useState } from 'react';
import { useSelector } from 'react-redux';
import TimePicker from 'react-time-picker';
import moment from 'moment';
import { Lesson } from '@shared/api';
import { Button } from '@shared/ui';
import TrainersDropdown from 'features/trainersDropdown/TrainersDropdown';
import PlacesDropdown from 'features/placesDropdown/PlacesDropdown';
import { ReactComponent as CloseButton } from '@shared/assets/svg/close.svg';
import { getCurrentTrainer } from '@app/providers/store/scheduleModal';
import { type LessonI } from '@shared/api/lesson/lesson.interface';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import styles from './ModalAddLesson.module.scss';

interface ModalAddLessonProps {
	day: any;
	data: { [key: string]: LessonI[] };
	setActive: any;
	closeModal: any;
	onSubmit: () => void;
}

export const ModalAddLesson = ({
	day,
	setActive,
	closeModal,
	onSubmit
}: ModalAddLessonProps) => {
	const currentTrainer = useSelector(getCurrentTrainer);
	const [newLesson, setNewLesson] = useState<any>({
		space_id: null,
		trainer_id: currentTrainer?.id,
		trainer_comments: null,
		start: moment(day).set({ hour: 12, minute: 0 }).format()
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	async function handleSubmit() {
		const { space_id, trainer_id, start } = newLesson;
		if (!space_id || !trainer_id || !start) {
			setErrorMessage(
				'Пожалуйста, заполните все обязательные поля: тренер, площадка и время.'
			);
			return;
		}
		const [, err] = await Lesson.create(newLesson);
		if (err) {
			setErrorMessage(
				'Произошла ошибка при создании урока. Попробуйте ещё раз.'
			);
			return;
		}
		onSubmit();
		setErrorMessage(null);
		setActive(false);
	}

	//TODO: почистить стили
	return (
		<div className={styles.container}>
			{/* <DateChanger day={day} className={styles.header} /> */}
			<header className={styles.header}>
				<button className={styles.close_btn} onClick={closeModal}>
					<CloseButton className={styles.icon} width={16} />
				</button>
			</header>
			<main className={styles.main}>
				<TrainersDropdown
					state={newLesson.trainer_id}
					setState={(id: string) =>
						setNewLesson({ ...newLesson, trainer_id: id })
					}
					className={styles.trainer}
					single
				/>
				<PlacesDropdown
					state={newLesson.space_id}
					setState={(id: string) =>
						setNewLesson((prev: any) => ({ ...prev, space_id: id }))
					}
					className={styles.place}
					single
				/>
				<div className={styles.time_wrapper}>
					<TimePicker
						className={styles.time}
						maxDetail="minute"
						onInput={(e) => {
							if (e.target.value.length >= 2) {
								e.target.value = e.target.value.slice(0, 2);
							}
						}}
						onChange={(e: any) => {
							if (!e) return;
							const [hour, minute] = e.split(':').map(Number);
							setNewLesson((prev: any) => ({
								...prev,
								start: moment(day).set({ hour, minute }).format()
							}));
						}}
						value={moment(newLesson.start).format('HH:mm')}
						format="HH:mm"
						locale="sv-sv"
						disableClock
						clearIcon={null}
					/>
				</div>
				<textarea
					className={styles.textarea}
					onChange={(e) =>
						setNewLesson((prev: any) => ({
							...prev,
							trainer_comments: e.target.value
						}))
					}
				></textarea>
				{errorMessage && <div className={styles.error}>{errorMessage}</div>}
				<Button className={styles.submit} onClick={handleSubmit} bgColor="dark">
					Отправить
				</Button>
			</main>
		</div>
	);
};
