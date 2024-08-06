import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ContentCopy as CopyIcon, Edit as EditIcon, Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'mediumseagreen',
  color: 'white',
  fontSize: '12px',
  fontFamily: 'Poppins',
  '&:hover': {
    backgroundColor: 'seagreen',
  },
}));

const TerminalBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: '#1e1e1e',
  borderRadius: theme.shape.borderRadius,
  '& pre': {
    margin: 0,
    color: '#ffff',
    fontFamily: 'monospace',
    fontSize: '14px',
    flexGrow: 1,
  },
  '& .MuiIconButton-root': {
    color: '#ffff',
  },
}));

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'getting-started', title: 'Getting started' },
  { id: 'taking-on-job', title: 'Model training' },
  { id: 'rewards', title: 'Rewards and tokens' },
];

const commands = {
  installCommunex: 'pip install communex',
  createKey: 'comx key create <key>',
  cloneRepo: 'https://github.com/bigideainc/yogptv1.git',
  cdRepo: 'cd yogptv1',
  installPoetry: 'pip install poetry',
  poetryShell: 'poetry shell',
  installRequirements: 'pip install -r requirements.txt',
  startMiner: 'python yogpt-subnet/cli.py --testnet miner <key> <ip-address> <port>',
  startValidator: 'python yogpt-subnet/cli.py --testnet validator <key> <ip-address> <port>',
};

const Documentation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSections = sections.filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCommand = (command) => (
    <TerminalBox>
      <pre>{command}</pre>
      <CopyToClipboard text={command}>
        <IconButton>
          <CopyIcon />
        </IconButton>
      </CopyToClipboard>
    </TerminalBox>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: 'white', color: 'black', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            bgcolor: '#333',
            color: 'white',
            mt: '64px',
          },
        }}
      >
        <Box p={2}>
          <TextField 
            placeholder="Search..."
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
              },
            }}
          />
        </Box>
        <List>
          {filteredSections.map((section) => (
            <ListItem button key={section.id} onClick={() => document.getElementById(section.id).scrollIntoView({ behavior: 'smooth' })}>
              <ListItemText primary={section.title} primaryTypographyProps={{ sx: { fontSize: '12px', fontWeight: 'bold' } }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: 'white', mt: '64px' }}>
        <IconButton onClick={toggleDrawer} sx={{ display: { md: 'none' }, mb: 2, color: 'black' }}>
          <MenuIcon />
        </IconButton>

        <Box id="introduction">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '14px' }}>INTRODUCTION</Typography>

          </Box>
          <Paper sx={{ padding: 3, mb: 4, bgcolor: 'white', color: 'black' }}>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              YoGPT platform is designed to train, fine-tune, and perform inference on LLM models using blockchain technology and distributed training. Miners with the necessary computational specifications are automatically assigned training jobs using the YoGPT platform and rewarded based on specific conditions. These conditions include achieving a validation loss threshold of ≤0.3 and completing the training within the specified time range. Some participants will register as validators and others as inferencing service providers, with all being rewarded according to the jobs they are assigned.
            </Typography>
          </Paper>
        </Box>

        <Box id="getting-started">
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontSize: '14px' }}>GETTING STARTED</Typography>
          <Paper sx={{ padding: 3, mb: 4, bgcolor: 'white', color: 'black' }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontSize: '14px' }}>INSTALLATION AND SETUP</Typography>
            {renderCommand(commands.installCommunex)}
            {renderCommand(commands.createKey)}
            {renderCommand(commands.cloneRepo)}
            {renderCommand(commands.cdRepo)}
            {renderCommand(commands.installPoetry)}
            {renderCommand(commands.poetryShell)}
            {renderCommand(commands.installRequirements)}
          </Paper>

          <Paper sx={{ padding: 3, mb: 4, bgcolor: 'white', color: 'black' }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontSize: '14px' }}>SETTING UP A MINER</Typography>
            {renderCommand(commands.startMiner)}
          </Paper>

          <Paper sx={{ padding: 3, mb: 4, bgcolor: 'white', color: 'black' }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontSize: '14px' }}>SETTING UP AS A VALIDATOR</Typography>
            {renderCommand(commands.startValidator)}
          </Paper>

          <Paper sx={{ padding: 3, mb: 4, bgcolor: 'white', color: 'black' }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontSize: '14px' }}>SETTING UP AS AN INFERENCE AGENT</Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              Note: The functionality for inference agents is coming soon. Please stay tuned for updates on this feature.
            </Typography>
          </Paper>
        </Box>

        <Box id="taking-on-job">
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontSize: '14px' }}>TAKING ON A JOB AND FINE-TUNING PROCESS</Typography>
          <Paper sx={{ padding: 3, mb: 4, bgcolor: 'white', color: 'black' }}>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              In this scenario, a miner is automatically assigned a job based on its computational specifications. Jobs are specified on the platform regarding the dataset, model setup, configurations, and training pipeline. If the job is interrupted, the training process is regarded as failed and the miner is not rewarded. Only successful and completed jobs within the specified time are rewarded.
            </Typography>
          </Paper>
        </Box>

        <Box id="rewards">
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontSize: '14px' }}>REWARDS AND TOKENS</Typography>
          <Paper sx={{ padding: 3, mb: 4, bgcolor: 'white', color: 'black' }}>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              The YoGPT platform offers a robust reward system to incentivize miners, validators, and inference agents for their contributions. Rewards are based on the successful completion of fine-tuning jobs, meeting validation loss thresholds, and adhering to time constraints. Rewards are converted into Communie tokens and credited to the participant's account upon successful job completion.
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2, bgcolor: 'white' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'black', fontSize: '14px', fontWeight: 'bold' }}>Model</TableCell>
                    <TableCell sx={{ color: 'black', fontSize: '14px', fontWeight: 'bold' }}>Training per hour ($)</TableCell>
                    <TableCell sx={{ color: 'black', fontSize: '14px', fontWeight: 'bold' }}>Threshold (loss)</TableCell>
                    <TableCell sx={{ color: 'black', fontSize: '14px', fontWeight: 'bold' }}>Fine-tuning Time threshold (hrs)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { model: 'llama2-7b', rate: 1.2, loss: '<= 0.20', time: '10-12' },
                    { model: 'OpenELM-270', rate: 1.0, loss: '<= 0.50', time: '3-5' },
                    { model: 'OpenELM-450M', rate: 1.3, loss: '<= 0.35', time: '6-8' },
                    { model: 'OpenELM-3B', rate: 2.2, loss: '<= 0.20', time: '10-12' },
                    { model: 'GPT2', rate: 1.5, loss: '<= 0.50', time: '3-5' },
                    { model: 'LLama3B', rate: 2.2, loss: '<= 0.35', time: '6-8' },
                  ].map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ color: 'black', fontSize: '14px' }}>{row.model}</TableCell>
                      <TableCell sx={{ color: 'black', fontSize: '14px' }}>{row.rate}</TableCell>
                      <TableCell sx={{ color: 'black', fontSize: '14px' }}>{row.loss}</TableCell>
                      <TableCell sx={{ color: 'black', fontSize: '14px' }}>{row.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Documentation;