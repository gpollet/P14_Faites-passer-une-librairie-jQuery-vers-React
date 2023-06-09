import type {} from "@mui/x-data-grid/themeAugmentation";

export interface DropdownValues {
	name: string;
}

export interface Employee {
	id: number;
	employees: [
		{
			firstName: string;
			lastName: string;
			startDate: string;
			department: string;
			dateOfBirth: string;
			street: string;
			city: string;
			state: string;
			zipCode: string;
			id?: number;
		}
	];
}

export interface States {
	states: [{ name: string; abbreviation?: string }];
}

export interface Departments {
	departments: [{ name: string }];
}
