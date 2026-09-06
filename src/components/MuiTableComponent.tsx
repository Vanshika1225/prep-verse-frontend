import { Box, Skeleton, type Theme } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { Problem } from "@/pages/DSAPractice/ProblemList/types";

interface ProblemTableProps {
  rows: Problem[] | [];
  columns: GridColDef<Problem>[];
  theme: Theme;
  loading?: boolean;
}

const SKELETON_ROW_COUNT = 10;
const ROW_HEIGHT = 78;

const TableSkeleton = ({
  columns,
  theme,
}: {
  columns: GridColDef<Problem>[];
  theme: Theme;
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: `${SKELETON_ROW_COUNT * ROW_HEIGHT}px`,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: SKELETON_ROW_COUNT }).map((_, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: "flex",
            width: "100%",
            height: ROW_HEIGHT,
            minHeight: ROW_HEIGHT,
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
            boxSizing: "border-box",
          }}
        >
          {columns.map((column) => (
            <Box
              key={column.field}
              sx={{
                width: column.width,
                minWidth: column.minWidth,
                flex: column.flex ? `${column.flex} 1 0` : undefined,
                px: 2,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Skeleton
                variant="rounded"
                animation="wave"
                sx={{
                  width:
                    rowIndex % 3 === 0
                      ? "75%"
                      : rowIndex % 3 === 1
                        ? "60%"
                        : "45%",
                  height: 20,
                }}
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

const MuiTableComponent = ({
  rows,
  columns,
  theme,
  loading = false,
}: ProblemTableProps) => {
  return (
    <DataGrid
      rows={loading ? [] : rows}
      columns={columns}
      loading={loading}
      getRowId={(row) => row._id}
      hideFooter
      disableRowSelectionOnClick
      disableColumnResize
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
      rowHeight={ROW_HEIGHT}
      columnHeaderHeight={52}
      slots={{
        loadingOverlay: () => <TableSkeleton columns={columns} theme={theme} />,
      }}
      slotProps={{
        loadingOverlay: {
          variant: "skeleton",
        },
      }}
      sx={{
        height: "100%",
        width: "100%",
        border: 0,

        ...(loading && {
          "& .MuiDataGrid-overlayWrapper": {
            width: "100%",
            minHeight: `${SKELETON_ROW_COUNT * ROW_HEIGHT}px`,
            maxHeight: `${SKELETON_ROW_COUNT * ROW_HEIGHT}px`,
            overflow: "hidden",
          },

          "& .MuiDataGrid-overlayWrapperInner": {
            width: "100%",
            height: `${SKELETON_ROW_COUNT * ROW_HEIGHT}px`,
            maxHeight: `${SKELETON_ROW_COUNT * ROW_HEIGHT}px`,
            overflow: "hidden",
          },
        }),

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
