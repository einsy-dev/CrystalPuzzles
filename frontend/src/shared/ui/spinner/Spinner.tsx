import styles from './Spinner.module.scss';
import { useEffect, useState } from 'react';
import { ReactComponent as Puzzle } from './assets/puzzle.svg';

interface SpinnerProps {
	isLoading: boolean;
	children: React.ReactNode;
}

export default function Spinner({ children, isLoading }: SpinnerProps) {
	const [state, setState] = useState<any>([]);

	useEffect(() => {
		const interval = setInterval(() => {
			setState((prev: any) => {
				if (prev.length >= 4) {
					return [];
				}
				return [...prev, Math.random()];
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles.container}>
			{isLoading ? (
				<div className={styles.puzzles}>
					{state.map((item: any, index: number) => (
						<Puzzle key={item} className={styles.puzzle} data-num={index} />
					))}
				</div>
			) : (
				children
			)}
		</div>
	);
}
