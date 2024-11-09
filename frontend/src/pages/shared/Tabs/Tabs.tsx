import { useState } from 'react';
import styles from './Tabs.module.scss';
const tabItems = [
	{
		title: 'Создать',
		key: 'create',
		component: ''
	},
	{
		title: 'Изменить',
		key: 'edit',
		component: ''
	}
];

export const Tabs = () => {
	const [activeTab, setActiveTab] = useState('create');
	return (
		<div className={styles.component}>
			<header className={styles.header}>
				{tabItems.map((tab) => (
					<button
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
						className={styles.tab}
					>
						{tab.title}
					</button>
				))}
			</header>
			<div>{tabItems.find((tab) => tab.key === activeTab)?.component}</div>
		</div>
	);
};
