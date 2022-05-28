import React, { useCallback } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { insertKampagnen } from '../api/index.jsx';
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  width: "auto",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function PopModal({ handleKampagnenUpdate }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [kunde, setKundeChange] = React.useState("");
  const [kampagnenname, setKampagnenname] = React.useState("");
  const [startZeit, setStartZeit] = React.useState<Date | null>(new Date());
  const [endZeit, setEndZeit] = React.useState<Date | null>(new Date());
  const [status, setStatus] = React.useState("");

  const dateFormatter = (date) => {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    return dd+'-'+mm+'-'+yyyy;
  }

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleKampagnennameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKampagnenname(event.target.value as string);
  }; 

  const handleKundeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKundeChange(event.target.value as string);
  };

  const handleSubmit = useCallback(
    (e: any) => {
        // insert the payload into the database
        try {
            insertKampagnen(e).then(
                () => {
                    handleKampagnenUpdate()
                },
                (rejected) => {
                    console.log(rejected);
                }
            );
        } catch (err) {
            console.log('error', err);
        }
    },
    [handleKampagnenUpdate]
);

  const addKampagnen = (e) => {
    e.preventDefault();
    const payload = { 
      kampagnenname, 
      kunde, 
      status, 
      start: dateFormatter(startZeit),
      end: dateFormatter(startZeit)
    };
    handleSubmit(payload);
    handleClose();
  };

  return (
        <div>
          <Button variant="contained" onClick={handleOpen}>
            Kampagne Erstellen
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={style}>
            <Box
              className="kampagnenForm"
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "100%" }
              }}
              autoComplete="off"
              onSubmit={addKampagnen}
            >
            <div className="formHeader">
              <Typography id="modal-title" variant="h6" component="h2">
                Kampagne erstellen
              </Typography>
              <hr />
            </div>
            <div className="formFields">
              <label>Kampagnenname*:</label>
              <TextField
                onChange={handleKampagnennameChange}
                required
                id="outlined-basic"
                label="Kampagnenname eingeben"
                variant="outlined"
              />

              <label>Kunde*:</label>
              <TextField
                onChange={handleKundeChange}
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
                    openTo="year"
                    views={['day', 'month', 'year']}
                    value={startZeit}
                    onChange={(zeit) => setStartZeit(zeit)}
                    renderInput={(params) => <TextField {...params} />}
                  />

                  <label>Ende*:</label>
                  <DatePicker
                    disableFuture
                    label="Responsive"
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={endZeit}
                    onChange={(zeit) => setEndZeit(zeit)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <label>Status:</label>
              <Select
                labelId="select-label"
                id="select-label"
                value={status}
                onChange={handleStatusChange}
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
              <Button type="button" onClick={handleClose} variant="outlined">
                Abbrechen
              </Button>
              <Button type="submit" variant="contained">
                Erstellen
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
