import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import { EmployeeData } from "./types";
import { collectionListAll } from "./api/api";
import { lazy } from "react";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				// If no path is specified, loads Home
				path: "/*",
				loader: async () => {
					return redirect("/index");
				},
			},
			{
				path: "/index",
				Component: lazy(() => import("./pages/Home")),
				loader:  async () => {
					const states = collectionListAll("states")
					const departments = collectionListAll("departments")
					// Delays data query to after UI has loaded for improved performances and UX
					return { states: await states, departments: await departments };
				},
			},
			{
				path: "/employee-list",
				Component: lazy(() => import("./pages/EmployeeList")),
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
