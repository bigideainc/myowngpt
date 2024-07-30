import React from 'react';
import { Container, Box, Typography, Grid, Paper, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Menu as MenuIcon, ContentCopy as CopyIcon } from '@mui/icons-material';
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

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'taking-on-job', title: 'Taking on a Job and Fine-Tuning Process' },
  { id: 'rewards', title: 'Rewards and Tokens' },
];

const commands = {
  installCommunex: 'pip install communex',
  createKey: 'comx key create <key>',
  cloneRepo: 'git clone https://github.com/bigideainc/CommuneImplementation.git',
  cdRepo: 'cd CommuneImplementation',
  installPoetry: 'pip install poetry',
  poetryShell: 'poetry shell',
  installRequirements: 'pip install -r requirements.txt',
  startMiner: 'python yogpt-subnet/cli.py --testnet miner <key> <ip-address> <port>',
  startValidator: 'python yogpt-subnet/cli.py --testnet validator <key> <ip-address> <port>',
};

const Documentation = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderCommand = (command) => (
    <Box display="flex" alignItems="center" mb={2}>
      <Typography variant="body2" sx={{ fontFamily: 'Poppins', fontSize: '14px', flexGrow: 1 }}>{command}</Typography>
      <CopyToClipboard text={command}>
        <IconButton>
          <CopyIcon />
        </IconButton>
      </CopyToClipboard>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
        <Drawer
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{ width: 240, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' } }}
        >
          <List>
            {sections.map((section) => (
              <ListItem button key={section.id} onClick={() => document.getElementById(section.id).scrollIntoView({ behavior: 'smooth' })}>
                <ListItemText primary={section.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
          <IconButton onClick={toggleDrawer} sx={{ display: { md: 'none' }, mb: 2 }}>
            <MenuIcon />
          </IconButton>

          <Box id="introduction">
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2 }}>Introduction</Typography>
            <Paper sx={{ padding: 3, mb: 4 }}>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                YoGPT platform is designed to train, fine-tune, and perform inference on LLM models using blockchain technology and distributed training. Miners with the necessary computational specifications are automatically assigned training jobs using the YoGPT platform and rewarded based on specific conditions. These conditions include achieving a validation loss threshold of ≤0.3 and completing the training within the specified time range. Some participants will register as validators and others as inferencing service providers, with all being rewarded according to the jobs they are assigned.
              </Typography>
            </Paper>
          </Box>

          <Box id="getting-started">
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2 }}>Getting Started</Typography>
            <Paper sx={{ padding: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2 }}>Installation and Setup</Typography>
              {renderCommand(commands.installCommunex)}
              {renderCommand(commands.createKey)}
              {renderCommand(commands.cloneRepo)}
              {renderCommand(commands.cdRepo)}
              {renderCommand(commands.installPoetry)}
              {renderCommand(commands.poetryShell)}
              {renderCommand(commands.installRequirements)}
            </Paper>

            <Paper sx={{ padding: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2 }}>Setting Up a Miner</Typography>
              {renderCommand(commands.startMiner)}
            </Paper>

            <Paper sx={{ padding: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2 }}>Setting Up as a Validator</Typography>
              {renderCommand(commands.startValidator)}
            </Paper>

            <Paper sx={{ padding: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2 }}>Setting Up as an Inference Agent</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                Note: The functionality for inference agents is coming soon. Please stay tuned for updates on this feature.
              </Typography>
            </Paper>
          </Box>

          <Box id="taking-on-job">
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2 }}>Taking on a Job and Fine-Tuning Process</Typography>
            <Paper sx={{ padding: 3, mb: 4 }}>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                In this scenario, a miner is automatically assigned a job based on its computational specifications. Jobs are specified on the platform regarding the dataset, model setup, configurations, and training pipeline. If the job is interrupted, the training process is regarded as failed and the miner is not rewarded. Only successful and completed jobs within the specified time are rewarded.
              </Typography>
            </Paper>
          </Box>

          <Box id="rewards">
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2 }}>Rewards and Tokens</Typography>
            <Paper sx={{ padding: 3, mb: 4 }}>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
                The YoGPT platform offers a robust reward system to incentivize miners, validators, and inference agents for their contributions. Rewards are based on the successful completion of fine-tuning jobs, meeting validation loss thresholds, and adhering to time constraints. Rewards are converted into Communie tokens and credited to the participant's account upon successful job completion.
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Model</TableCell>
                      <TableCell>Training per hour ($)</TableCell>
                      <TableCell>Threshold (loss)</TableCell>
                      <TableCell>Fine-tuning Time threshold (hrs)</TableCell>
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
                        <TableCell>{row.model}</TableCell>
                        <TableCell>{row.rate}</TableCell>
                        <TableCell>{row.loss}</TableCell>
                        <TableCell>{row.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Documentation;
