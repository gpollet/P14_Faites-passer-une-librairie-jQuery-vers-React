import { useLoaderData } from "react-router-dom";
import {
	DataGrid,
	GridColDef,
	GridRowsProp,
	GridToolbarQuickFilter,
	GridApi,
} from "@mui/x-data-grid";
import _ from "lodash";

const EmployeesTable = () => {
	const employeesList = useLoaderData().employees;
	const fieldsList = useLoaderData().tableFields[0].fields;

	// Auto generates the name of the columns, provided by API
	const tableColumns: GridColDef[] = fieldsList.map((field) => {
		const fieldName = _.camelCase(field);
		return { field: `${fieldName}`, headerName: `${field}`, width: 150 };
	});

	const rows: GridRowsProp = [...employeesList];
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
            labelRowsPerPage: 'Entries per page'
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
