interface LessonCreateParams {
	space_id: number;
	trainer_id: number;
	trainer_comments?: string;
	start: string;
}

interface LessonGetParams {
	start_date?: string;
	end_date?: string;
	trainer?: string;
	limit?: number;
	offset?: number;
}

interface LessonUpdateParams {
	id: string | number;
	space_id?: number;
	trainer_id?: number;
	trainer_comments?: string;
	start?: string;
	exercises?: string;
	students?: string;
}

interface StudentI {
	lesson_id: number | string;
	student_id: number;
}

interface LessonI {
	id: number;
	space: {
		id: number;
		name: string;
	};
	start: string;
	status: string;
	trainer: {
		firstname: string;
		id: number;
		lastname: string;
		photo: string;
		surname: string;
	};
	trainer_comments: string;
}

export type {
	LessonCreateParams,
	LessonGetParams,
	LessonUpdateParams,
	StudentI,
	LessonI
};
