import TimePicker from 'react-time-picker';
import styles from './CustomTimePicker.module.scss';
import classNames from 'classnames';

interface CustomTimePickerProps {
	value: string;
	onChange: (time: string | null) => void;
	day?: string;
	className?: string;
	onInput?: any;
}
//TODO: удалить
export const CustomTimePicker = ({
	value,
	onChange,
	className
}: CustomTimePickerProps) => {
	return (
		<TimePicker
			className={classNames(styles.time, className)}
			maxDetail="minute"
			onChange={onChange}
			value={value}
			format="HH:mm"
			locale="sv-sv"
			disableClock
			clearIcon={null}
		/>
	);
};
