import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BasicTextFields({ onClose }) {
  const [startZeit, setStartZeit] = React.useState<Date | null>(new Date());
  const [endZeit, setEndZeit] = React.useState<Date | null>(new Date());
  const [status, setStatus] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const addKampagnen = () => {
    onClose();
  };

  return (
    <Box
      className="kampagnenForm"
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "100%" }
      }}
      noValidate
      autoComplete="off"
    >
      <div className="formHeader">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Kampagne erstellen
        </Typography>
        <hr />
      </div>

      <div className="formFields">
        <label>Kampagnenname*:</label>
        <TextField
          required
          id="outlined-basic"
          label="Kampagnenname eingeben"
          variant="outlined"
        />

        <label>Kunde*:</label>
        <TextField
          required
          id="outlined-basic"
          label="Kunde eingeben"
          variant="outlined"
        />

        <label>Laufzeit:</label>
        <div className="formDateTime">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <label>Start*:</label>
            <DatePicker
              disableFuture
              label="Responsive"
              openTo="year"
              views={["year", "month", "day"]}
              value={startZeit}
              onChange={(zeit) => {
                setStartZeit(zeit);
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            <label>Ende*:</label>
            <DatePicker
              disableFuture
              label="Responsive"
              openTo="year"
              views={["year", "month", "day"]}
              value={endZeit}
              onChange={(zeit) => {
                setEndZeit(zeit);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <label>Status:</label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem disabled selected value="">
            Status festlegen
          </MenuItem>
          <MenuItem value={"Erstellt"}>Erstellt</MenuItem>
          <MenuItem value={"Angebot"}>Angebot</MenuItem>
          <MenuItem value={"Gebucht"}>Gebucht</MenuItem>
          <MenuItem value={"Archiviert"}>Archiviert</MenuItem>
        </Select>
      </div>

      <div className="formButtons">
        <Button onClick={onClose} variant="outlined">
          Abbrechen
        </Button>
        <Button onClick={addKampagnen} variant="contained">
          Erstellen
        </Button>
      </div>
    </Box>
  );
}
