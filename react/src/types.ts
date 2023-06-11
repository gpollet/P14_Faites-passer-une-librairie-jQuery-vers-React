import type {} from "@mui/x-data-grid/themeAugmentation";

export interface DropdownValues {
	name: string;
}

export interface Employee {
	dateOfBirth: string;
	startDate: string;
	_id: number;
	firstName: string;
	lastName: string;
	department: string;
	street: string;
	city: string;
	state: string;
	zipCode: string;
	id?: number;
}

export interface States {
	states: [{ name: string; abbreviation?: string }];
}

export interface Departments {
	departments: [{ name: string }];
}
