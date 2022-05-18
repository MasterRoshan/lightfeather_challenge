import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function App() {
  const [selectedSupervisor, setSelectedSupervisor] = React.useState('');
  const [supervisors, setSupervisors] = React.useState(null);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

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
    fetch('http://localhost:8000/api/submit',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        supervisor: selectedSupervisor
      })
    })
  }
  
  React.useEffect(() => {
    fetch('http://localhost:8000/api/select')
      .then(response => response.json())
      .then(data => {
        let supervisors = []
        for (let key in data.results) {
          let supervisor = data.results[key]
          supervisors.push(<MenuItem 
                              value={supervisor.id}
                              key={'supervisor' + supervisor.id}
                            >
                            {supervisor.first_name + ' ' + supervisor.last_name}
                            </MenuItem>)
        }
        setSupervisors(supervisors)
      })

  },[])

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
              Notification Form
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField value={firstName} onChange={handleFirstNameChange} id="first-name" label="First Name" variant="outlined" fullWidth autoFocus required/>
          </Grid>
          <Grid item xs={6}>
            <TextField value={lastName} onChange={handleLastNameChange} id="last-name" label="Last Name" variant="outlined" fullWidth autoFocus required/>
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
            <TextField value={email} onChange={handleEmailChange} id="email" label="Email" variant="outlined" fullWidth autoFocus/>
          </Grid>
          <Grid item xs={6}>
            <TextField value={phone} onChange={handlePhoneChange} id="phone" label="Phone Number" variant="outlined" fullWidth autoFocus/>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="supervisor-label">Supervisor</InputLabel>
              <Select
                labelId="supervisor-label"
                id="supervisor"
                value={selectedSupervisor}
                label="Supervisor"
                onChange={handleChange}
                fullWidth
                required
              >
                {supervisors}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default App;
