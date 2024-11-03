export interface UserI {
	surname: string;
	firstname: string;
	lastname: string;
}
//TODO: тип для этой функции подходит не во всех случаях (см. EditProfile.tsx)
export default function joinName(user: any) {
	const { surname, firstname, lastname } = user;
	return `${surname ? surname : ''} ${firstname ? firstname : ''} ${lastname ? lastname : ''}`.trim();
}
