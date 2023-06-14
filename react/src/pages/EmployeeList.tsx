import { NavLink } from "react-router-dom";
import EmployeesTable from "../components/EmployeesTable";

const EmployeeList = () => {

	return (
		<div id="employee-div" className="container">
			<h1>Current Employees</h1>
				<EmployeesTable />
			<NavLink to={"/index"}>Home</NavLink>
		</div>
	);
};

export default EmployeeList;