import { ReactComponent as Plus } from './assets/plus.svg';
import { ReactComponent as File } from './assets/check_list.svg';
import styles from './ScheduleButton.module.scss';

interface ScheduleButtonProps {
	onclick?: () => void;
	className?: string;
	edit: boolean;
}

export const ScheduleButton = ({
	onclick,
	className,
	edit = false
}: ScheduleButtonProps) => {
	return (
		<div className={className}>
			{edit ? (
				<Plus className={styles.svg} onClick={onclick} />
			) : (
				<File onClick={onclick} className={styles.file} />
			)}
		</div>
	);
};
