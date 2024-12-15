import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStudents, setStudents } from '@app/providers/store/app';
import { DropDownButton } from '@features';
import { User } from '@entities';
import joinName from 'entities/profile/assets/joinName';

interface StudentsDropdownProps {
	className?: string;
	state: any;
	setState: any;
	single?: boolean;
}

export default function StudentsDropdown({
	state,
	setState,
	className,
	single = false
}: StudentsDropdownProps) {
	const dispatch = useDispatch();
	const students = useSelector(selectStudents);
	const [data, setData] = useState<any>([]);

	useEffect(() => {
		getStudents();
	}, [students]);

	async function getStudents() {
		if (students) {
			setData(students.map((item: any) => ({ ...item, name: joinName(item) })));
		} else {
			const [data, err] = await User.getStudents();
			if (err) return;
			dispatch(setStudents(data));
		}
	}

	return (
		<DropDownButton
			className={className}
			title="Выберите учеников"
			state={state}
			setState={setState}
			data={data}
			single={single}
		/>
	);
}
