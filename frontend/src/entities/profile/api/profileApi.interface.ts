interface ExtentionParams {
	phone_number?: string;
	area?: string;
	accompanying?: string;
	health_data?: string;
	triggers?: string;
}
interface EditProfileParams {
	firstname?: string;
	lastname?: string;
	surname?: string;
	birthday?: string;
	is_man?: boolean;
	contact?: string;
	extentions: ExtentionParams;
}

export type { EditProfileParams };
