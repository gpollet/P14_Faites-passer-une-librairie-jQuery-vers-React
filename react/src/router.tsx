import { createBrowserRouter, defer, redirect } from "react-router-dom";
import App from "./App";
import EmployeeList from "./pages/EmployeeList";
import Home from "./pages/Home";
import { EmployeeData } from "./types";
import { collectionListAll } from "./api/api";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				// If no path is specified, loads Home
				path: "/*",
				element: <Home />,
				loader: async () => {
					return redirect("/index");
				},
			},
			{
				path: "/index",
				element: <Home />,
				loader:  async () => {
					const states = collectionListAll("states")
					const departments = collectionListAll("departments")
					// Delays data query to after UI has loaded for improved performances and UX
					return defer({ states: states, departments: departments });
				},
			},
			{
				path: "/employee-list",
				element: <EmployeeList />,
				loader: async () => {
					const mockEmployeesList = await collectionListAll("employees");
					mockEmployeesList?.map((employee: EmployeeData, index: number) => {
						employee.startDate = new Date(employee.startDate);
						employee.dateOfBirth = new Date(employee.dateOfBirth);
						employee.id = index;
					});

					return { employees: mockEmployeesList };
				},
			},
		],
	},
]);

export default router;
