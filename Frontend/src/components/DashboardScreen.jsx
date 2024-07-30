import EventIcon from '@mui/icons-material/Event';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Card, CardContent, Checkbox, Container, FormControl, Grid, InputAdornment, InputLabel, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { auth } from '../auth/config/firebase-config';
import { Footer } from '../widgets/Footer';
import Navbar from './Navbar';

const statuses = ["Ready", "Error", "Building", "Queued", "Canceled"];
const modelNames = ["main", "back-up", "new-frontend"];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([
    { id: 1, name: "rngdp7bxb", status: "Ready", branch: "main", modified: "Frontend/src/component...", time: "2h ago", user: "BANADDA" },
    { id: 2, name: "jzjjafef0", status: "Ready", branch: "main", modified: "Frontend/package-lock...", time: "2h ago", user: "BANADDA" },
    { id: 3, name: "2s78xtylw", status: "Ready", branch: "main", modified: "Frontend/src/component...", time: "10h ago", user: "BANADDA" },
    // Add more jobs here as per your requirement
  ]);
  const [selectedModel, setSelectedModel] = useState([]);
  const [status, setStatus] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleModelChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedModel(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleStatusChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatus(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "90px", marginBottom: "90px", minHeight: '80vh', display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column', backgroundColor: '#f0f2f5' }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Deployments
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <RefreshIcon />
                <Typography variant="subtitle1" gutterBottom sx={{ ml: 1 }}>
                  Continuously generated from {user ? user.displayName : 'GitHub'}
                </Typography>
              </Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="branches-select">All Models...</InputLabel>
                    <Select
                      label="Sort by model"
                      multiple
                      value={selectedModel}
                      onChange={handleModelChange}
                      renderValue={(selected) => selected.join(', ')}
                      startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                    >
                      {modelNames.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={selectedModel.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Select Start Date"
                    type="date"
                    fullWidth
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EventIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Select End Date"
                    type="date"
                    fullWidth
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EventIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="environments-select">All Status</InputLabel>
                    <Select
                      label="All Environments"
                      multiple
                      value={status}
                      onChange={handleStatusChange}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          <Checkbox checked={status.indexOf(status) > -1} />
                          <ListItemText primary={status} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Deployments
              </Typography>
              {jobs.map((job) => (
                <Box key={job.id} display="flex" alignItems="center" mb={2}>
                  <Box flexGrow={1}>
                    <Typography variant="body1" component="span">{job.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{job.status}</Typography>
                    <Typography variant="body2" color="textSecondary">{job.branch}</Typography>
                    <Typography variant="body2" color="textSecondary">{job.modified}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">{job.time}</Typography>
                    <Typography variant="body2" color="textSecondary">{job.user}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Dashboard;
