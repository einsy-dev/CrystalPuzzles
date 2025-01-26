import { Link, useNavigate } from 'react-router-dom';
import { Page, CardLink, Button, Preloader } from 'shared/ui';
import { useResize } from 'shared/hooks';
import { ScheduleList } from 'features';
import { Notification } from 'widgets';
import { AnalyticCardLink } from './AnalyticCardLink/AnalyticCardLink';
import { ProgressCardLink } from './ProgressCardLink/ProgressCardLink';
import { CurriculaCardLink } from './CurriculaCardLink/CurriculaCardLink';
import styles from './Main.module.scss';

interface MainPageProps {
	title: string;
}

export default function MainPage({ title }: MainPageProps) {
	const navigate = useNavigate();
	const isMobile = useResize('sm');

	return (
		<Page title={title} className={styles.page_wrapper}>
			<ProgressCardLink className={styles.progress} />
			<AnalyticCardLink className={styles.analytic} />
			<CurriculaCardLink className={styles.plan} />
			<CardLink
				to="/schedule"
				title={'Расписание'}
				className={styles.schedule_wrapper}
			>
				<ScheduleList link={false} />
			</CardLink>
			{isMobile ? (
				<Link to={'/notifications'}>
					<Button title="Уведомления" className={styles.btn} />
				</Link>
			) : (
				<Notification className={styles.notification} />
			)}

			<div className={styles.btns_wrapper}>
				<Button
					title="Тренеры"
					bgColor="dark"
					className={styles.btn_trainer}
					width="100%"
					onClick={() => navigate('/trainers')}
				/>
				<Button
					title="Ученики"
					bgColor="dark"
					className={styles.btn_student}
					width="100%"
					onClick={() => navigate('/students')}
				/>
			</div>
		</Page>
	);
}
