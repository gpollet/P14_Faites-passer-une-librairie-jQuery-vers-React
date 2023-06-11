import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import Dropdown from "./Dropdown";
import { Departments, States } from "../types";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import _ from "lodash";

const EmployeeCreationForm = () => {
	const [birthDate, setBirthDate] = useState<Date | null>(null);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const { states } = useLoaderData() as States;
	const { departments } = useLoaderData() as Departments;
	const [opened, { open, close }] = useDisclosure(false);

	// Disables birth dates that would result in an age lower than {minimumAge} years old
	const getMaximumBirthDate = () => {
		const minimumAge = 18;
		const currentDay = new Date();
		const maxDate = currentDay.setFullYear(
			currentDay.getFullYear() - minimumAge
		);
		return new Date(maxDate);
	};

	const createEmployee = (event) => {
		event.preventDefault();
		const form = document.getElementById("create-employee");
		const formData = new FormData(form);
		const data = {};
		for (const [key, value] of formData) {
			data[_.camelCase(key)] = value;
		}
		console.log(data);
	};

	return (
		<>
			<form
				onSubmit={createEmployee}
				id="create-employee"
				name="create-employee">
				<label htmlFor="first-name">First Name</label>
				<input type="text" id="first-name" name="first-name" />

				<label htmlFor="last-name">Last Name</label>
				<input type="text" id="last-name" name="last-name" />

				<DatePickerInput
					label={"Date of Birth"}
					name={"date-of-birth"}
					value={birthDate}
					valueFormat="DD/MM/YYYY"
					maxDate={getMaximumBirthDate()}
					onChange={setBirthDate}
					clearable
				/>

				<DatePickerInput
					label={"Start Date"}
					name={"start-date"}
					value={startDate}
					onChange={setStartDate}
					clearable
				/>

				<fieldset className="address">
					<legend>Address</legend>

					<label htmlFor="street">Street</label>
					<input id="street" type="text" name="street" />

					<label htmlFor="city">City</label>
					<input id="city" type="text" name="city" />

					<Dropdown label="State" data={states} id="state" name={"states"} />

					<label htmlFor="zip-code">Zip Code</label>
					<input id="zip-code" type="number" name="zip-code" minLength={5} />
				</fieldset>

				<Dropdown
					label="Department"
					data={departments}
					id="department"
					name={"department"}
				/>
				<div>
					<button type="submit" onClick={open}>
						Save
					</button>
				</div>
			</form>
			<div>
				<Modal opened={opened} onClose={close} centered>
					<p>Employee Created!</p>
				</Modal>
			</div>
		</>
	);
};

export default EmployeeCreationForm;
