import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import Dropdown from "./Dropdown";
import { Departments, States } from "../types";

const EmployeeCreationForm = () => {
	const [birthDate, setBirthDate] = useState<Date | null>(null);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const { states } = useLoaderData() as States;
	const { departments } = useLoaderData() as Departments;

	// Disables birth dates that would result in an age lower than {minimumAge} years old
	const getMaximumBirthDate = () => {
		const minimumAge = 18;
		const currentDay = new Date();
		const maxDate = currentDay.setFullYear(
			currentDay.getFullYear() - minimumAge
		);
		return new Date(maxDate);
	};

	return (
		<>
			<form action="#" id="create-employee">
				<label htmlFor="first-name">First Name</label>
				<input type="text" id="first-name" />

				<label htmlFor="last-name">Last Name</label>
				<input type="text" id="last-name" />

				<label htmlFor="date-of-birth">Date of Birth</label>
				<DatePickerInput
					id="date-of-birth"
					value={birthDate}
					maxDate={getMaximumBirthDate()}
					onChange={setBirthDate}
					clearable
				/>

				<label htmlFor="start-date">Start Date</label>
				<DatePickerInput
					id="start-date"
					value={startDate}
					onChange={setStartDate}
					clearable
				/>

				<fieldset className="address">
					<legend>Address</legend>

					<label htmlFor="street">Street</label>
					<input id="street" type="text" />

					<label htmlFor="city">City</label>
					<input id="city" type="text" />

					<Dropdown label="State" data={states} id="state" />

					<label htmlFor="zip-code">Zip Code</label>
					<input id="zip-code" type="number" />
				</fieldset>

				<Dropdown label="Department" data={departments} id="department" />
			</form>
		</>
	);
};

export default EmployeeCreationForm;
