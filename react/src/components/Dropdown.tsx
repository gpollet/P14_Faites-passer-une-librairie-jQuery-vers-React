import { ChangeEvent, useState } from "react";

const Dropdown = ({
	data,
	label,
	id,
	name=id,
	width = 300,
	height = 40,
}: {
	data: { name: string }[];
	label: string;
	id: string;
	name?: string;
	width?: number;
	height?: number;
}): JSX.Element => {
	// Enables/Disables sorting (ascending A -> Z) of the options of the dropdown
	const enableOptionSorting = true;

	const [selectValue, setSelectValue] = useState(label);

	const createOptionList = () => {
		//Failsafe to prevent component from breaking the App if data is missing
		if (!data) return;
		const orderedItems: string[] = [];
		Object.values(data).map((element) => {
			orderedItems.push(element.name);
		});

		if (enableOptionSorting === true) orderedItems.sort();
		return orderedItems.map((element, index) => {
			return (
				<option
					key={index}
					style={{ textAlign: "center", color: "black" }}
					value={element}>
					{element}
				</option>
			);
		});
	};

	const defaultSelectStyle: { width: number; height: number; color: string } = {
		width: width,
		height: height,
		color: "gray",
	};

	// Selecting an <option> adds the 'selected' attribute to it, removes it from the previous value if it existed and updates the state with the new value.
	const updateSelectValue = (event: ChangeEvent<HTMLSelectElement>) => {
		const previousMatchingOption = document.querySelector(
			`option[value='${selectValue}']`
		);
		previousMatchingOption?.removeAttribute("selected");
		setSelectValue(event.target.value);
		const matchingOptionElement = document.querySelector(
			`option[value='${event.target.value}']`
		);
		matchingOptionElement?.setAttribute("selected", "");
	};

	return (
		<div className={`${id}-container`} style={{display:"flex", flexDirection:"column"}}>
			<label style={{ fontWeight: 500, fontSize: "0.875rem" }} htmlFor={id}>
				{label}
			</label>
			<select
				onChange={(event) => {
					updateSelectValue(event);
				}}
				value={selectValue}
				name={name}
				id={id}
				style={
					(selectValue === label ? "" : (defaultSelectStyle.color = "black"),
					defaultSelectStyle)
				}>
				<option style={{ textAlign: "center", color: "gray" }} disabled>
					{label}
				</option>
				{createOptionList()}
			</select>
		</div>
	);
};

export default Dropdown;
