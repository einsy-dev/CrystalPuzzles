import styles from './Schedule.module.scss';
import { useState } from 'react';
import { Page, Button } from '@shared/ui';
import Table from './Table/Table';
import { useNavigate } from 'react-router-dom';
import TrainersDropdown from 'features/trainersDropdown/TrainersDropdown';

interface ShedulePageProps {
	edit?: boolean;
	title: string;
}

export default function ShedulePage({ edit = false, title }: ShedulePageProps) {
	const [data, setData] = useState({
		space_id: null,
		trainer_id: null
	});
	const navigate = useNavigate();

	return (
		<Page title={title}>
			<div className={styles.component}>
				<Table edit={edit} data={data} className={styles.table} />
				{/* <div className={styles.buttons_container}> */}
				<TrainersDropdown
					className={styles.trainer}
					setState={(id: string) => {
						setData((prev: any) => ({ ...prev, trainer_id: id }));
					}}
					state={data.trainer_id}
					single
				/>
				{edit ? null : (
					<Button
						bgColor="dark"
						className={styles.edit_btn}
						title="Составить расписание"
						onClick={() => navigate('./edit')}
					/>
				)}
				{/* </div> */}
			</div>
		</Page>
	);
}
