import { useEffect, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { ReactComponent as Arrow } from 'shared/assets/svg/circle_arrow.svg';
import styles from './DateChanger.module.scss';

// TODO: Delete this component?
export default function DateChanger({ className, day }: any) {
	const [date, setDate]: any = useState(moment());
	useEffect(() => {
		setDate(moment(day));
	}, [day]);

	return (
		<header className={classNames(styles.top, className)}>
			<button
				className={styles.arrow_btn}
				onClick={() => setDate((prev: any) => prev.clone().subtract(1, 'days'))}
			>
				<Arrow className={styles.arrow} />
			</button>
			<h3 className={styles.month_title}>{date.format('ll')}</h3>
			<button
				className={styles.arrow_btn}
				onClick={() => setDate((prev: any) => prev.clone().add(1, 'days'))}
			>
				<Arrow className={classNames(styles.arrow, styles.arrow_rotation)} />
			</button>
		</header>
	);
}
