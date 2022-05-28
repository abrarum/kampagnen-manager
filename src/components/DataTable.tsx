import React from 'react';
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "_id", headerName: "CS-ID", width: 70, flex: 1 },
  { field: "kunde", headerName: "Kunde", width: 130, flex: 1 },
  { field: "kampagnenname", headerName: "Kampagnenname", width: 130, flex: 1 },
  {
    field: "start",
    headerName: "Start",
    width: 90,
    type: "date",
    flex: 1
  },
  {
    field: "end",
    headerName: "End",
    width: 90,
    type: "date",
    flex: 1
  },
  {
    field: "status",
    headerName: "Status",
    width: 90,
    flex: 1
  }
];

export default function DataTable({kampagnen}) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={kampagnen}
        columns={columns}
        autoHeight
        pageSize={100}
        rowsPerPageOptions={[5, 10, 20]}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
        getRowId={(row) => row._id}
      />
    </div>
  );
}
