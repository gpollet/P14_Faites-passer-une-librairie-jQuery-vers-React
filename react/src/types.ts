import { createTheme } from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';

const muiTheme = createTheme({
  components: {
    // Use `MuiDataGrid` on DataGrid, DataGridPro and DataGridPremium
    MuiDataGrid: {
      styleOverrides: {
        root: {
          //backgroundColor: 'red',
        },
      },
    },
  },
});

export default muiTheme