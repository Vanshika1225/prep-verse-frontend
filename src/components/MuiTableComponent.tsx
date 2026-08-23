import type { Theme } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { Problem } from "@/pages/DSAPractice/ProblemList/types";

interface ProblemTableProps {
  rows: Problem[];
  columns: GridColDef<Problem>[];
  theme: Theme;
}

const MuiTableComponent = ({ rows, columns, theme }: ProblemTableProps) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row.id}
      hideFooter
      disableRowSelectionOnClick
      disableColumnResize
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
      rowHeight={78}
      columnHeaderHeight={52}
      sx={{
        height: "100%",
        width: "100%",
        border: 0,

        "& .MuiDataGrid-columnHeaders": {
          bgcolor: theme.palette.white.main100,
          borderBottom: `1px solid ${theme.palette.divider}`,
        },

        "& .MuiDataGrid-columnHeader": {
          outline: "none !important",
        },

        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: 700,
          color: theme.palette.black.secondary,
        },

        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${theme.palette.divider}`,
          outline: "none !important",
          display: "flex",
          alignItems: "center",
        },

        "& .MuiDataGrid-row": {
          "&:hover": {
            bgcolor: theme.palette.white.main300,
          },
        },

        "& .MuiDataGrid-row:last-child .MuiDataGrid-cell": {
          borderBottom: "none",
        },

        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },
      }}
    />
  );
};

export default MuiTableComponent;
