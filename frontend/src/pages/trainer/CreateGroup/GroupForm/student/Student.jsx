import styles from './Student.module.scss';

export default function Students({ data, setStudents, checked = false }) {
	function handleChange() {
		setStudents((prev) => {
			if (prev.includes(data)) {
				return prev.filter((item) => item !== data);
			} else {
				return [...prev, data];
			}
		});
	}
	return (
		<div className={styles.container}>
			<div className={styles.student_name}>{data.firstname}</div>
			<div className={styles.checkbox_container}>
				<input
					className={styles.checkbox}
					type="checkbox"
					defaultChecked={checked}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
