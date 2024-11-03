import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import { ScheduleButton } from '../ScheduleButton/ScheduleButton';
import { setCurrentDate } from '@app/providers/store/scheduleModal';
import { selectLessons } from '@app/providers/store/schedule';
import styles from './DaysList.module.scss';

interface DaysListProps {
	setModalActive: (day: string) => void;
	edit: boolean;
}

export default function DaysList({ setModalActive, edit }: DaysListProps) {
	const dispatch = useDispatch();
	const lessons = useSelector(selectLessons);
	const data = lessons;

	return (
		<ul className={classNames(styles.grid, styles.days)}>
			{Object.keys(data).map((key, index) => (
				<li key={index} className={styles.day}>
					<span> {moment(key).format('D')}</span>
					{data ? (
						<div
							className={classNames(styles.active, {
								[styles.activeWithLessons]: data[key].length > 0
							})}
						>
							<div className={styles.schedule}>
								{data[key]
									.slice()
									.sort((a: any, b: any) =>
										moment(a.start).diff(moment(b.start))
									)
									.map((el, i) => (
										<div key={i}>
											<span className={styles.time}>
												{moment(el.start).format('HH:mm')}
											</span>
											<span className={styles.space_name}>{el.space.name}</span>
										</div>
									))}
							</div>
						</div>
					) : null}
					<ScheduleButton
						edit={edit}
						className={styles.add_btn}
						onclick={() => {
							dispatch(setCurrentDate(key));
							setModalActive(key);
						}}
					/>
				</li>
			))}
		</ul>
	);
}
