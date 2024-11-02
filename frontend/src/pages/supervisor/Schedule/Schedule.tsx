import { useNavigate } from 'react-router-dom';
import { Page, Button } from '@shared/ui';
import Table from './Table/Table';
import TrainersDropdown from 'features/trainersDropdown/TrainersDropdown';
import styles from './Schedule.module.scss';

interface ShedulePageProps {
	edit?: boolean;
	title: string;
}

export default function ShedulePage({ edit = false, title }: ShedulePageProps) {
	const navigate = useNavigate();

	return (
		<Page title={title}>
			<div className={styles.component}>
				<Table edit={edit} className={styles.table} />
				<TrainersDropdown className={styles.trainer} single />
				{edit ? null : (
					<Button
						bgColor="dark"
						className={styles.edit_btn}
						title="Составить расписание"
						onClick={() => navigate('./edit')}
					/>
				)}
			</div>
		</Page>
	);
}
