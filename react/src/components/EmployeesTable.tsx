import { useLoaderData } from "react-router-dom";
import {
	DataGrid,
	GridColDef,
	GridRowsProp,
	GridToolbarQuickFilter,
	GridColumnHeaders,
} from "@mui/x-data-grid";
import camelCase from "lodash.camelcase";
import { Employee } from "../types";
import React from "react";

const EmployeesTable = () => {
	const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
	const { employees } = useLoaderData() as { employees: Employee };

	const columnNames = [
		"First Name",
		"Last Name",
		"Start Date",
		"Department",
		"Date Of Birth",
		"Street",
		"City",
		"State",
		"Zip Code",
	];

	// Generates the required properties for DataGrid columns display
	const tableColumns: GridColDef[] = columnNames.map((element: string) => {
		const getElementType =
			element === "Start Date" || element === "Date Of Birth"
				? "date"
				: "string";

		const field: {
			field: string;
			headerName: string;
			width: number;
			type: string;
		} = {
			field: camelCase(element),
			headerName: element,
			width: 150,
			type: getElementType,
		};
		return field;
	});

	const rows: GridRowsProp = employees;
	return (
		<>
			<DataGrid
				rows={rows}
				columns={tableColumns}
				// Adds a search bar to the table
				slots={{
					toolbar: GridToolbarQuickFilter,
					columnHeaders: MemoizedColumnHeaders,
				}}
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
