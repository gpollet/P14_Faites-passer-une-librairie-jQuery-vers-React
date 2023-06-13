import { NavLink } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import EmployeesTable from "../components/EmployeesTable";

const EmployeeList = () => {
	const muiTheme = createTheme({
		components: {
			MuiDataGrid: {
			},
		},
	});
	return (
		<div id="employee-div" className="container">
			<h1>Current Employees</h1>
			{/* ThemeProvider required to avoid having error : Cannot read properties of undefined (reading 'mode')
			*/}
			<ThemeProvider theme={muiTheme}>
				<EmployeesTable />
			</ThemeProvider>
			<NavLink to={"/index"}>Home</NavLink>
		</div>
	);
};

export default EmployeeList;