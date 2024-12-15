import styles from './Spinner.module.scss';
import { Preloader } from './preloader/Preloader';

interface SpinnerProps {
	isLoading: boolean;
	children: React.ReactNode;
}

export default function Spinner({ children, isLoading }: SpinnerProps) {
	return (
		<div className={styles.container}>
			{isLoading ? <Preloader /> : children}
		</div>
	);
}
