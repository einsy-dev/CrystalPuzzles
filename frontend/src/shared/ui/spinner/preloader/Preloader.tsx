import { memo } from 'react';
import classNames from 'classnames';
import { ReactComponent as Puzzle } from '../assets/puzzle.svg';
import styles from './Preloader.module.scss';

interface PreloaderProps {
	className?: string;
}

export const Preloader = memo(({ className }: PreloaderProps) => {
	return (
		<div className={classNames(styles.component, className)}>
			{[...Array(4)].map((_, i) => (
				<Puzzle key={i} className={styles.puzzle} data-number={i} />
			))}
		</div>
	);
});

Preloader.displayName = 'Preloader';
