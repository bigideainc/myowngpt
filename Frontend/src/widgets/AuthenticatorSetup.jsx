import { Box, Button, Link, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import React from 'react';

const AuthenticatorSetup = ({ onRegister }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 600, width: '100%' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          YoGpt Miner Program
        </Typography>
        <Typography variant="body1" component="div" sx={{ marginBottom: 4 }}>
          Your organization requires you to set up the following methods of proving who you are.
        </Typography>
        <Stepper activeStep={0} alternativeLabel>
          <Step>
            <StepLabel>App</StepLabel>
          </Step>
          <Step>
            <StepLabel>Questions</StepLabel>
          </Step>
        </Stepper>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Microsoft Authenticator
          </Typography>
          <Typography variant="body1" component="div" sx={{ marginBottom: 2 }}>
            Enter your miner user name
          </Typography>
          <TextField
            label=""
            variant="outlined"
            value="User Name"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="body1" component="div" sx={{ marginBottom: 2 }}>
            Enter your wallet address
          </Typography>
          <TextField
            label=""
            variant="outlined"
            value="Wallet Address"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={onRegister}
            sx={{ textTransform: 'none', marginBottom: 2 }}
            fullWidth
          >
            Register
          </Button>
          <Link href="#" sx={{ display: 'block' }}>
            I want to set up a different method
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthenticatorSetup;
