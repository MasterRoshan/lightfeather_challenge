import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import FormHelperText from "@mui/material/FormHelperText";

function App() {
  const [selectedSupervisor, setSelectedSupervisor] = React.useState("");
  const [selectedSupervisorError, setSelectedSupervisorError] = React.useState(false);
  const [selectedSupervisorErrorText, setSelectedSupervisorErrorText] = React.useState("");
  const [supervisors, setSupervisors] = React.useState(null);
  const [firstName, setFirstName] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameErrorText, setFirstNameErrorText] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorText, setLastNameErrorText] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorText, setEmailErrorText] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorText, setPhoneErrorText] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleChange = (event) => {
    setSelectedSupervisor(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        supervisor: selectedSupervisor,
      }),
    })
      .then((response) => {
        setFirstNameError(false);
        setFirstNameErrorText("");
        setLastNameError(false);
        setLastNameErrorText("");
        setEmailError(false);
        setEmailErrorText("");
        setPhoneError(false);
        setPhoneErrorText("");
        setSelectedSupervisorError(false);
        setSelectedSupervisorErrorText("");
        setSuccess(response.ok);
        if (response.ok) return false;
        else return response.json();
      })
      .then((messages) => {
        if (messages) {
          if ("first_name" in messages) {
            setFirstNameError(true);
            setFirstNameErrorText(messages.first_name[0]);
          }
          if ("last_name" in messages) {
            setLastNameError(true);
            setLastNameErrorText(messages.last_name[0]);
          }
          if ("email" in messages) {
            setEmailError(true);
            setEmailErrorText(messages.email[0]);
          }
          if ("phone" in messages) {
            setPhoneError(true);
            setPhoneErrorText(messages.phone[0]);
          }
          if ("supervisor" in messages) {
            setSelectedSupervisorError(true);
            setSelectedSupervisorErrorText(messages.supervisor[0]);
          }
        }
      });
  };

  React.useEffect(() => {
    fetch("http://localhost:8000/api/select")
      .then((response) => response.json())
      .then((data) => {
        let supervisors = [];
        for (let key in data.results) {
          let supervisor = data.results[key];
          supervisors.push(
            <MenuItem value={supervisor.id} key={"supervisor" + supervisor.id}>
              {supervisor.first_name + " " + supervisor.last_name}
            </MenuItem>
          );
        }
        setSupervisors(supervisors);
      });
  }, []);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
          >
            Notification Form
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField
              value={firstName}
              onChange={handleFirstNameChange}
              error={firstNameError}
              helperText={firstNameErrorText}
              id="first-name"
              label="First Name"
              variant="outlined"
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={lastName}
              onChange={handleLastNameChange}
              error={lastNameError}
              helperText={lastNameErrorText}
              id="last-name"
              label="Last Name"
              variant="outlined"
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <Typography component="div">
              How would you like to be notified?
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Email" />
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Phone Number" />
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailErrorText}
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={phone}
              onChange={handlePhoneChange}
              error={phoneError}
              helperText={phoneErrorText}
              id="phone"
              label="Phone Number"
              variant="outlined"
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={selectedSupervisorError}>
              <InputLabel id="supervisor-label">Supervisor</InputLabel>
              <Select
                labelId="supervisor-label"
                id="supervisor"
                value={selectedSupervisor}
                label="Supervisor"
                onChange={handleChange}
                fullWidth
              >
                {supervisors}
              </Select>
              {selectedSupervisorError && (
                <FormHelperText>{selectedSupervisorErrorText}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
          {success && (
            <Grid item xs={12}>
              <Alert severity="success">
                Your info was submitted successfully — prepare to be notified!
              </Alert>
            </Grid>
          )}
        </Grid>
      </form>
    </div>
  );
}

export default App;
