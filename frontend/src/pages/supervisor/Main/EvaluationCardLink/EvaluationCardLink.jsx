import { CardLink } from '@shared/ui/card';
import styles from './EvaluationCardLink.module.scss';

export const EvaluationCardLink = () => {
	return (
		<CardLink to="/evaluation" title="Таблицы" className={styles.evaluation} />
	);
};
