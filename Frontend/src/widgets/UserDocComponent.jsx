import { Edit as EditIcon, Menu as MenuIcon } from '@mui/icons-material';
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
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

const modelsData = [
  { type: 'GPT-2', models: ['GPT-2', 'GPT-2 Medium', 'GPT-2 Large', 'GPT-2 XL'] },
  { type: 'LLaMA-2', models: ['LLaMA-2 7B', 'LLaMA-2 13B', 'NousResearch LLaMA2'] },
  { type: 'OpenELM', models: ['OpenELM 270M', 'OpenELM 450M', 'OpenELM 3B'] }
];

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'getStarted', title: 'Get Started' },
  { id: 'fineTuning', title: 'Fine-Tuning' },
  { id: 'deploying', title: 'Deploying Models' },
  { id: 'billing', title: 'Billing and Pricing' },
];

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: 'black',
  fontSize: '12px',
  fontFamily: 'Poppins',
  border: '1px solid black',
  '&:hover': {
    backgroundColor: 'lightgray',
  },
}));

function UserDocComponent() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredSections = sections.filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            bgcolor: '#1E1E1E',
            fontSize: '10px',
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
            <StyledButton startIcon={<EditIcon />}>
              Edit this doc
            </StyledButton>
          </Box>
          <Paper sx={{ padding: 3, mb: 4, bgcolor: 'white', color: 'black' }}>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              YoGPT is a powerful platform designed for fine-tuning large language models, enabling clients to customize GPT models, LLaMA2 models, and OpenELM models. The platform provides an intuitive interface and robust tools for seamless model customization. Users can interact with their customized models via an API, offering flexibility and scalability for various applications.
            </Typography>
            <Typography mt={2}>
              The platform supports models such as GPT-2, GPT-2 Medium, GPT-2 Large, GPT-2 XL, LLaMA-2 7B, LLaMA-2 13B, NousResearch LLaMA2, OpenELM 270M, OpenELM 450M, and OpenELM 3B. These models can be fine-tuned on both HuggingFace data and custom datasets for tailored applications.
            </Typography>
          </Paper>
        </Box>

        <Box id="getStarted">
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontSize: '14px' }}>GETTING STARTED</Typography>
          <Paper sx={{ padding: 3, mb: 4, bgcolor: 'white', color: 'black' }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontSize: '14px' }}>INSTALLATION AND SETUP</Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              To begin, tap on "Create New Job" on the home screen. Fill in the training job form with the necessary details such as model type, dataset, and hyperparameters. Advanced settings are available for configuring training rounds and other parameters for technical users.
            </Typography>
            <Typography mt={2}>
              Once the form is completed, submit it to initiate the fine-tuning process. You can monitor the job status and view results directly on the platform. Detailed instructions and guides are available.
            </Typography>
            <Typography mt={2}>
              For billing details, please refer to our pricing page to understand the costs associated with different operations.
            </Typography>
          </Paper>
        </Box>

        <Box id="fineTuning">
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontSize: '14px' }}>FINE-TUNING</Typography>
          <Paper sx={{ padding: 3, mb: 4, bgcolor: 'white', color: 'black' }}>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              YoGPT supports fine-tuning of several powerful models, including:
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2, backgroundColor: 'black' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>Model Type</TableCell>
                    <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>Models</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modelsData.map((model) => (
                    <TableRow key={model.type}>
                      <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>{model.type}</TableCell>
                      <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>{model.models.join(', ')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography mt={2}>
              These models can be fine-tuned using both HuggingFace datasets and custom datasets provided by the user. This ensures that the models are tailored to your specific requirements.
            </Typography>
          </Paper>
        </Box>

        <Box id="deploying">
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontSize: '14px' }}>DEPLOYING MODELS</Typography>
          <Paper sx={{ padding: 3, mb: 4, bgcolor: 'white', color: 'black' }}>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              Once your model is fine-tuned, you can deploy it on the YoGPT platform for seamless interaction and integration. The platform provides an easy-to-use API for inference and interaction, allowing you to incorporate the model into your applications. Subscription options for the API are available to suit different needs.
            </Typography>
          </Paper>
        </Box>

        <Box id="billing">
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', mb: 2, fontSize: '14px' }}>BILLING AND PRICING</Typography>
          <Paper sx={{ padding: 3, mb: 4, bgcolor: 'white', color: 'black' }}>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }}>
              Pricing for Training Jobs
            </Typography>
            <Typography mt={2}>
              Detailed information about the pricing for training jobs can be found on our pricing page. This includes costs for different model types and the associated fine-tuning time.
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins', fontSize: '14px' }} mt={2}>
              Pricing for Inference
            </Typography>
            <Typography mt={2}>
              For information on pricing for inference services, please refer to our detailed pricing section. This will help you understand the costs associated with deploying and utilizing your models.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default UserDocComponent;
