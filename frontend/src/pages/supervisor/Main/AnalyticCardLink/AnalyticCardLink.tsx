import { CardLink } from '@shared/ui/card';
import styles from './AnalyticCardLink.module.scss';

export const AnalyticCardLink = () => {
	return (
		<CardLink
			to="/analytic"
			title="Анализ эффективности"
			className={styles.analitic}
		/>
	);
};
