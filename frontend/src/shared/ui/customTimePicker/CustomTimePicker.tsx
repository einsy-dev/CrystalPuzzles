import TimePicker from 'react-time-picker';

interface CustomTimePickerProps {
	value: string;
	onChange: (time: string | null) => void;
	day?: string;
	className?: string;
	onInput?: any;
}

export const CustomTimePicker = ({
	value,
	onChange,
	className
}: CustomTimePickerProps) => {
	return (
		<TimePicker
			className={className}
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
