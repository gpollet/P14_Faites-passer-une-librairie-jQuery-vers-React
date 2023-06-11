const Dropdown = ({
	data,
	label,
	id,
}: {
	data: { name: string }[];
	label: string;
	name?: string,
	id: string;
}): JSX.Element => {
	
	// Enables/Disables sorting (ascending A -> Z) of the options of the dropdown
	const enableOptionSorting = true;

	const createOptionList = () => {
		const orderedItems: string[] = [];
		Object.values(data).map((element) => {
			orderedItems.push(element.name);
		});
		if (enableOptionSorting === true) orderedItems.sort();
		return orderedItems.map((element, index) => {
			return <option key={index}>{element}</option>;
		});
	};

	return (
		<>
			<label htmlFor={id}>{label}</label>
			<select name={id} id={id}>
				{createOptionList()}
			</select>
		</>
	);
};

export default Dropdown;
