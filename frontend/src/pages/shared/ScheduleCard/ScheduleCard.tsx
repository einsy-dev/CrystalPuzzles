import { useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import joinName from 'entities/profile/assets/joinName';
import { Button } from '@shared/ui';
import { ReactComponent as ClockeIcon } from '@shared/assets/svg/clock.svg';
import { ReactComponent as Trash } from '@shared/assets/svg/trash.svg';
import { ReactComponent as Pencil } from '@shared/assets/svg/pencil.svg';
import { type LessonI } from '@shared/api/lesson/lesson.interface';
import styles from './ScheduleCard.module.scss';

interface ScheduleCardProps {
	className?: string;
	item: LessonI;
	setEditData: () => void;
	requestDelete: () => void;
}

export const ScheduleCard = ({
	item,
	setEditData,
	requestDelete,
	className
}: ScheduleCardProps) => {
	const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);

	return (
		<li className={classNames(styles.component, className)}>
			<div className={styles.trainer_wrapper}>
				<p>Тренер:</p>
				<p className={styles.trainer}>{joinName(item.trainer)}</p>
			</div>

			<div className={styles.place_wrapper}>
				<ClockeIcon width={'26px'} />
				<div>
					<p className={styles.time}>{moment(item.start).format('HH:mm')}</p>
					<p className={styles.place}>{item.space.name} </p>
				</div>
			</div>

			<div className={styles.comment_wrapper}>
				<div className={styles.subtitle}>Комментарии:</div>
				<p className={styles.text}>{item.trainer_comments}</p>
			</div>
			<div className={styles.icon_wrapper}>
				<Pencil className={styles.icon} onClick={setEditData} />
				<Trash
					className={styles.icon}
					onClick={() => setConfirmDeleteActive(true)}
				/>
			</div>

			{confirmDeleteActive && (
				<div className={styles.confirm}>
					<div>
						<p className={styles.question}>
							Вы действительно хотите удалить запись?
						</p>
						<div className={styles.btn_wrapper}>
							<Button
								className={styles.btn}
								title="Удалить"
								width="180px"
								bgColor="dark"
								onClick={requestDelete}
							/>
							<Button
								title="Отменить"
								width="180px"
								onClick={() => setConfirmDeleteActive(false)}
							/>
						</div>
					</div>
				</div>
			)}
		</li>
	);
};
