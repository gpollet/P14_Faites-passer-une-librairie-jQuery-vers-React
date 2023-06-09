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
	const { employees } = useLoaderData() as Employee;

	// Auto generates the name of the columns based on the [key] names from {employees} entries, and removes "id" (added in router.tsx) from the columns to display
	const fieldsList = () => {
		const fields = Object.keys(employees[0]);
		fields.pop();
		return fields;
	};
	
	const tableColumns: GridColDef[] = fieldsList().map((element: string) => {
		const fieldName = _.camelCase(element);
		// Reverts camel case to display columns names in a readable format
		const columnName = _.startCase(fieldName);
		return { field: `${fieldName}`, headerName: `${columnName}`, width: 150 };
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
