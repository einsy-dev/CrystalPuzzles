import { ScheduleCard } from '@pages/shared/ScheduleCard/ScheduleCard';
import { LessonI } from '@shared/api/lesson/lesson.interface';
import styles from './ViewLesson.module.scss';

interface ViewLessonProps {
	lessons: LessonI[];
}

export const ViewLesson = ({ lessons }: ViewLessonProps) => {
	return (
		<ul className={styles.cards_content}>
			{lessons.map((item) => (
				<ScheduleCard key={item.id} item={item} />
			))}
		</ul>
	);
};
