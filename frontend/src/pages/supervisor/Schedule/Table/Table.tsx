import { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import classNames from 'classnames';
import 'moment/locale/ru';
import { Lesson } from '@shared/api';
import Header from './Header/Header';
import DaysList from './DaysList/DaysList';
import DaysOfWeek from './DaysOfWeek/DaysOfWeek';
import { Modal } from '@shared/ui';
import ModalView from '../ModalView/ModalView';
import { ModalAddLesson } from '../ModalAddLesson/ModalAddLesson';
import styles from './Table.module.scss';

interface TableProps {
	edit: boolean;
	data: any;
	className?: string;
}

const Table = ({ edit, data: { trainer_id }, className }: TableProps) => {
	const [date, setDate] = useState<Moment>(moment().startOf('week'));
	const [data, setData]: any = useState(initData(date));
	const [modalActive, setModalActive] = useState<any | boolean>(false);
	const [editData, setEditData] = useState(null);

	useEffect(() => {
		setData(initData(date));
		getLessons();
	}, [date, trainer_id, modalActive]);

	async function getLessons() {
		if (!trainer_id || !date) return;
		const [data, err] = await Lesson.get({
			start_date: date.clone().toISOString(),
			end_date: date.clone().add(13, 'days').toISOString(),
			trainer: trainer_id
		});
		if (err) return;
		const obj = initData(date);
		data.forEach((item: any) => {
			const key = moment(item.start).format('YYYY-MM-DD');
			if (!Object.keys(obj).includes(key)) return;
			if (!obj[key]) obj[key] = [item];
			else obj[key] = [...obj[key], item];
		});
		setData(obj);
	}

	return (
		<div className={classNames(styles.datepicker, className)}>
			<Header setStartDate={setDate} startDate={date} />
			<div className={styles.grid_wrap}>
				<DaysOfWeek />
				<DaysList data={data} setModalActive={setModalActive} edit={edit} />
			</div>

			{modalActive && (
				<Modal
					active={modalActive}
					setActive={setModalActive}
					className={styles.modal}
				>
					{edit || editData ? (
						<ModalAddLesson
							day={modalActive}
							data={editData ? editData : data}
							setActive={setModalActive}
							closeModal={() => setModalActive(false)}
						/>
					) : (
						<ModalView
							setEditData={setEditData}
							day={modalActive}
							data={data[modalActive]}
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

function initData(date: Moment) {
	const obj: any = {};
	for (let index = 0; index < 14; index++) {
		obj[moment(date).add(index, 'days').format('YYYY-MM-DD')] = null;
	}
	return obj;
}
