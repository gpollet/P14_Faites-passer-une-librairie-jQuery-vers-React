import type {} from "@mui/x-data-grid/themeAugmentation";

export interface DropdownValues {
	name: string;
}

export type Employee = Array<{
	employees: {
		dateOfBirth: Date;
		startDate: Date;
		_id?: number;
		firstName: string;
		lastName: string;
		department: string;
		street: string;
		city: string;
		state: string;
		zipCode: string;
		id?: number;
	}
}>

export interface States {
	states: [{ name: string; abbreviation?: string }];
}

export interface Departments {
	departments: [{ name: string }];
}

export interface NewEmployeeData {
	[key:string]: FormDataEntryValue | Date | null,
	firstName: string;
		lastName: string;
		dateOfBirth: Date | null;
		startDate: Date | null;
		street: string;
		city: string;
		state: string;
		zipCode: string;
		department: string;
}