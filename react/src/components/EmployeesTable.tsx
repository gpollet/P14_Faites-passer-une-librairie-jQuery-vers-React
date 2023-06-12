import { useLoaderData } from "react-router-dom";
import {
	DataGrid,
	GridColDef,
	GridRowsProp,
	GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import _ from "lodash";
import { Employee } from "../types";

const EmployeesTable = () => {
	const { employees } = useLoaderData() as {employees:Employee};
	
	// Auto generates the name of the columns based on the [key] names from {employees} entries, 
	const fieldsList = () => {
		const fields = Object.keys(employees[0]);
		
		// Removes _id (auto-added by MongoDB at index 0) and "id" (added in router.tsx) from the columns to display
		const fieldsToDisplay = fields.filter(key => key !== "_id" && key !== "id")
		return fieldsToDisplay;
	};

	const tableColumns: GridColDef[] = fieldsList().map((element: string) => {
		const fieldName = _.camelCase(element);
		const field: {
			field: string;
			headerName: string;
			width: number;
			type?: string;
		} = {
			field: fieldName,
			// Reverts camel case to display columns names in a readable format
			headerName: _.startCase(fieldName),
			width: 150,
		};
		if (fieldName === "startDate" || fieldName === "dateOfBirth") {
			field.type = "date";
		}
		return field;
	});

	const rows: GridRowsProp = employees;
	return (
		<>
			<DataGrid
				rows={rows}
				columns={tableColumns}
				// Adds a search bar to the table
				slots={{ toolbar: GridToolbarQuickFilter }}
				initialState={{
					pagination: { paginationModel: { pageSize: 10 } },
				}}
				localeText={{
					MuiTablePagination: {
						labelDisplayedRows: ({ from, to, count }) =>
							`Showing ${from} to ${to} of ${count} entries`,
						labelRowsPerPage: "Entries per page",
					},
				}}
				disableColumnMenu
				hideFooterSelectedRowCount
				pageSizeOptions={[10, 25, 50, 100]}
			/>
		</>
	);
};

export default EmployeesTable;
