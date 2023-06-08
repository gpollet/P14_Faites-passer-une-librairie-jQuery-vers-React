import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import EmployeeList from "./pages/EmployeeList";
import Home from "./pages/Home";
import axios from "axios";

const homeLoader = async () => {
	const dropdownValues = await axios
		.get("../src/api/employeeCreationDropdownValues.json")
		.then((res) => {
			return res.data;
		});
	return dropdownValues;
}

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				// If no path is specified, loads Home
				path: "/*",
				element: <Home />,
				loader: homeLoader
			},
			{
				path: "/index",
				element: <Home />,
        loader: homeLoader
			},
			{
				path: "/employee-list",
				element: <EmployeeList />,
				loader: async () => {
					const mockEmployeesList = await axios
						.get("../src/api/employees.json")
						.then((res) => {
              res.data.map((employee, index) => 
                employee.id = index
              )
							return res.data;
						});
					const tableFields = await axios
						.get("../src/api/dataFields.json")
						.then((res) => {
							return res.data;
						});
					return {"employees":mockEmployeesList, "tableFields":tableFields};
				},
			},
		],
	},
]);

export default router;
