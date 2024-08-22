import styles from './Schedule.module.scss';
import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Page, Wrapper } from '@shared/ui';
import { CalendarBlock } from '@features';
import moment from 'moment';
import ScheduleItem from './ScheduleItem/ScheduleItem';

export default function SchedulePage({ link = false }) {
	const { lessons } = useLoaderData();
	const [data, setData] = useState([]);
	const [date, setDate] = useState({
		from: moment().startOf('day').toISOString(), // from and to are equal for this scenario
		to: moment().startOf('day').toISOString()
	});

	useEffect(() => {
		let filteredLessons = lessons.filter((item) =>
			moment(item.start).isSame(date.from, 'day')
		);
		for (let i = 0; filteredLessons.length < 7; i++) {
			filteredLessons.push({});
		}
		setData(filteredLessons);
	}, [date]);

	return (
		<Page title="Расписание">
			<div className={styles.table}>
				{data
					? data.map((item, index) => (
							<ScheduleItem
								data={item}
								key={index}
								link={link}
								className={index === 0 && styles.last}
							/>
						))
					: null}
			</div>
			<Wrapper>
				<CalendarBlock date={date} setDate={setDate} />
			</Wrapper>
		</Page>
	);
}
