import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import Dropdown from "./Dropdown";
import { Departments, NewEmployeeData, States } from "../types";
import { Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import _ from "lodash";
import { createDocument } from "../api/api";

const EmployeeCreationForm = () => {
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
	const [birthDate, setBirthDate] = useState<Date | null>(null);

	const createEmployee = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		const form = document.getElementById("create-employee") as HTMLFormElement;
		const formData = new FormData(form);
		const data: NewEmployeeData = {
			firstName: "",
			lastName: "",
			department: "",
			dateOfBirth: birthDate,
			startDate: startDate,
			street: "",
			city: "",
			state: "",
			zipCode: "",
		};

		// Retrieves the value of each input
		for (const [key] of formData) {
			const formatedKeyName = _.camelCase(key);
			if (formatedKeyName != "dateOfBirth" && formatedKeyName != "startDate") {
				data[formatedKeyName] = formData.get(key);
			}
		}
		//console.log(data)
		createDocument("employees", data);
	};

	return (
		<>
			<form
				onSubmit={createEmployee}
				id="create-employee"
				name="create-employee">
				<TextInput name="first-name" label="First Name" />
				<TextInput name="last-name" label="Last Name" />

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
					valueFormat="DD/MM/YYYY"
					onChange={setStartDate}
					clearable
				/>

				<fieldset className="address">
					<legend>Address</legend>
					<TextInput name="street" label="Street" />
					<TextInput name="city" label="City" />
					<Dropdown label="State" data={states} id="state" name="states" />
					<TextInput label="Zip Code" name="zip-code" minLength={5} maxLength={5}
					min={0}
					/>
				</fieldset>

				<Dropdown
					label="Department"
					data={departments}
					id="department"
					name={"department"}
				/>
				<div>
					<br />
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
