import { NavLink, useLoaderData } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import muiTheme from "../types";
import _ from "lodash";
import EmployeesTable from "../components/EmployeesTable";

const EmployeeList = () => {
	return (
		<div id="employee-div" className="container">
			<h1>Current Employees</h1>
			<ThemeProvider theme={muiTheme}>
				<EmployeesTable />
			</ThemeProvider>
			<NavLink to={"/index"}>Home</NavLink>
		</div>
	);
};

export default EmployeeList;

// Pour fonction recherche, possible utiliser Component tout prêt (cf MUI)
