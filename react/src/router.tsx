import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import EmployeeList from "./pages/EmployeeList";
import Home from "./pages/Home";
import axios from "axios";
import { Employee } from "./types";
import { collectionListAll } from "./api/api";

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
					const mockEmployeesList = await collectionListAll("employees");
					mockEmployeesList?.map((employee: Employee, index: number) => {
						employee.startDate = new Date().toLocaleDateString("fr")
						employee.dateOfBirth = new Date().toLocaleDateString("fr")
						employee.id = index;
					});

					return { employees: mockEmployeesList };
				},
			},
		],
	},
]);

export default router;
