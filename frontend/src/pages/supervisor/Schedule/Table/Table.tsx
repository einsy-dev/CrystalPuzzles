import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import Header from './Header/Header';
import DaysList from './DaysList/DaysList';
import DaysOfWeek from './DaysOfWeek/DaysOfWeek';
import { Modal } from '@shared/ui';
import { getCurrentTrainer, selectLessons } from '@app/providers/store';
import { getLessons } from '@app/providers/store/service/getLessons';
import { ModalView } from '../ModalView/ModalView';
import { ModalAddLesson } from '../ModalAddLesson/ModalAddLesson';
import styles from './Table.module.scss';

interface TableProps {
	edit: boolean;
	className?: string;
}

const Table = ({ edit, className }: TableProps) => {
	const lessons = useSelector(selectLessons);
	const currentTrainer = useSelector(getCurrentTrainer);
	const trainer_id = currentTrainer?.id;
	const [date, setDate] = useState<Moment>(moment().startOf('week'));
	const [modalActive, setModalActive] = useState<any | boolean>(false);

	const handleSubmit = () => {
		getLessons(trainer_id!, date);
	};

	useEffect(() => {
		getLessons(trainer_id!, date);
	}, [trainer_id, date]);

	return (
		<div className={classNames(styles.datepicker, className)}>
			<Header setStartDate={setDate} startDate={date} />
			<div className={styles.grid_wrap}>
				<DaysOfWeek />
				<DaysList setModalActive={setModalActive} edit={edit} />
			</div>

			{modalActive && (
				<Modal
					active={modalActive}
					setActive={setModalActive}
					className={styles.modal}
				>
					{/* {edit || editData ? ( */}
					{edit ? (
						<ModalAddLesson
							day={modalActive}
							data={lessons}
							setActive={setModalActive}
							closeModal={() => setModalActive(false)}
							onSubmit={handleSubmit}
						/>
					) : (
						<ModalView
							day={modalActive}
							data={lessons[modalActive]}
							setActive={setModalActive}
							closeModal={() => setModalActive(false)}
						/>
					)}
				</Modal>
			)}
		</div>
	);
};

export default Table;
