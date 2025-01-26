import styles from './Wrapper.module.scss';

// TODO:
export default function Wrapper({ children, width, max_width }: any) {
	return (
		<>
			<div
				className={styles.body}
				style={{
					width,
					maxWidth: max_width
				}}
			>
				{children}
			</div>
		</>
	);
}
