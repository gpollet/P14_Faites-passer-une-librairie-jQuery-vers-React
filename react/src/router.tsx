import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import EmployeeList from "./pages/EmployeeList";
import Home from "./pages/Home";
import axios from "axios";
import { Employee } from "./types";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				// If no path is specified, loads Home
				path: "/*",
				element: <Home />,
				loader: () => {
					return redirect("/index");
				},
			},
			{
				path: "/index",
				element: <Home />,
				loader: async () => {
					const { data } = await axios.get(
						"../src/api/employeeCreationDropdownValues.json"
					);
					return { states: data.states, departments: data.departments };
				},
			},
			{
				path: "/employee-list",
				element: <EmployeeList />,
				loader: async () => {
					const mockEmployeesList = await axios
						.get("../src/api/employees.json")
						.then((res) => {
							res.data.map(
								(employee: Employee, index: number) => (employee.id = index)
							);
							return res.data;
						});

					return { employees: mockEmployeesList };
				},
			},
		],
	},
]);

export default router;
