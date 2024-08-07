import styles from './ExerciseItem.module.scss';
import Checkbox from '../checkbox/Checkbox';

export default function ExerciseItem({
	text,
	img,
	index,
	id,
	defaultChecked = false,
	disabled = false
}) {
	return (
		<li className={styles.component}>
			<div className={styles.number}>{index}</div>
			<div className={styles.icon_wrapper}>
				<img
					className={styles.icon}
					src={require(`../../../shared/assets/exercise/${img}.svg`)}
				/>
			</div>
			<span className={styles.text}>{text}</span>
			<Checkbox disabled={disabled} defaultChecked={defaultChecked} id={id} />
		</li>
	);
}
