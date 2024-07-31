import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as CheckedIcon } from '@shared/assets/svg/checked.svg';
import styles from './Checkbox.module.scss';

export default function Checkbox({ defaultChecked, disabled, id = uuidv4() }) {
	return (
		<label className={styles.label} htmlFor={id}>
			<input
				className={styles.checkbox}
				id={id}
				type="checkbox"
				defaultChecked={defaultChecked}
				disabled={disabled}
			/>
			<CheckedIcon className={styles.icon} />
		</label>
	);
}
