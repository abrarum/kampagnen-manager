import * as React from "react";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "CS-ID", width: 70, flex: 1 },
  { field: "kunde", headerName: "Kunde", width: 130, flex: 1 },
  { field: "kampagnenName", headerName: "Kampagnenname", width: 130, flex: 1 },
  {
    field: "start",
    headerName: "Start",
    type: "dateTime",
    width: 90,
    flex: 1
  },
  {
    field: "ende",
    headerName: "Ende",
    type: "dateTime",
    width: 90,
    flex: 1
  },
  {
    field: "status",
    headerName: "Status",
    type: "string",
    width: 90,
    flex: 1
  }
];

const rows = [
  {
    id: 1,
    kunde: "Snow",
    kampagnenName: "Jon",
    start: 35,
    ende: 35,
    status: "Angebot"
  },
  {
    id: 2,
    kunde: "Lannister",
    kampagnenName: "Cersei",
    start: 42,
    ende: 35,
    status: "Angebot"
  },
  {
    id: 3,
    kunde: "Lannister",
    kampagnenName: "Jaime",
    start: 45,
    ende: 35,
    status: "Angebot"
  },
  {
    id: 4,
    kunde: "Stark",
    kampagnenName: "Arya",
    start: 16,
    ende: 35,
    status: "Gebucht"
  },
  {
    id: 5,
    kunde: "Targaryen",
    kampagnenName: "Daenerys",
    start: null,
    ende: 35,
    status: "Gebucht"
  },
  {
    id: 6,
    kunde: "Melisandre",
    kampagnenName: null,
    start: 150,
    ende: 35,
    status: "Gebucht"
  },
  {
    id: 7,
    kunde: "Clifford",
    kampagnenName: "Ferrara",
    start: 44,
    ende: 35,
    status: "Angebot"
  },
  {
    id: 8,
    kunde: "Frances",
    kampagnenName: "Rossini",
    start: 36,
    ende: 35,
    status: "Gebucht"
  },
  {
    id: 9,
    kunde: "Roxie",
    kampagnenName: "Harvey",
    start: 65,
    ende: 35,
    status: "Angebot"
  }
];

export default function DataTable() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
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
      />
    </div>
  );
}
