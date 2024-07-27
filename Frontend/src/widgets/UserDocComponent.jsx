import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const modelsData = [
  { type: 'GPT-2', models: ['GPT-2', 'GPT-2 Medium', 'GPT-2 Large', 'GPT-2 XL'] },
  { type: 'LLaMA-2', models: ['LLaMA-2 7B', 'LLaMA-2 13B', 'NousResearch LLaMA2'] },
  { type: 'OpenELM', models: ['OpenELM 270M', 'OpenELM 450M', 'OpenELM 3B'] }
];

function UserDocComponent() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 10,
        boxSizing: 'border-box',
        padding: { xs: 2, sm: 3, md: 4 },
        backgroundColor: '#f5f5f5'
      }}

    >
      <Box
        sx={{
          fontFamily: 'Poppins',
          fontSize: '14px',
          width: { xs: '100%', sm: '80%', md: '75%', lg: '80%' },
          padding: { xs: 2, sm: 3, md: 4 },
          boxSizing: 'border-box',
        }}
      >
        <Paper elevation={3} sx={{mb:2, mt:2, padding:2}}>
          <Typography variant='h5' sx={{ fontFamily: 'Poppins', marginBottom: '16px' }}>User Guide</Typography>
        </Paper>
       <Accordion expanded={expanded === 'introduction'} onChange={handleChange('introduction')} sx={{ backgroundColor: 'black', color: 'white', marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            aria-controls="introduction-content"
            id="introduction-header"
            sx={{ backgroundColor: '#333', padding: 2, borderRadius: 1 }}
          >
            <Typography variant="h6">Introduction</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'black', color: 'white', padding: 3, borderRadius: 1 }}>
            <Typography>
              YoGPT is a powerful platform designed for fine-tuning large language models, enabling clients to customize GPT models, LLaMA2 models, and OpenELM models. The platform provides an intuitive interface and robust tools for seamless model customization.
              <Box mt={2}>
                <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white' }} href="https://example.com/learn-more" target="_blank">Read More</Button>
              </Box>
            </Typography>
            <Typography mt={2}>
              Available models include GPT-2, GPT-2 Medium, GPT-2 Large, GPT-2 XL, LLaMA-2 7B, LLaMA-2 13B, NousResearch LLaMA2, OpenELM 270M, OpenELM 450M, and OpenELM 3B. These models can be fine-tuned on both HuggingFace data and customer datasets for tailored applications.
              <Box mt={2}>
                <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white' }} href="https://example.com/models" target="_blank">Read More</Button>
              </Box>
            </Typography>
            <Typography mt={2}>
              Users can deploy and interact with their customized models on the platform or via a subscription-based API. This integration ensures flexibility and scalability for various applications.
              <Box mt={2}>
                <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white' }} href="https://example.com/api" target="_blank">Read More</Button>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'getStarted'} onChange={handleChange('getStarted')} sx={{ backgroundColor: 'black', color: 'white', marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            aria-controls="getStarted-content"
            id="getStarted-header"
            sx={{ backgroundColor: '#333', padding: 2, borderRadius: 1 }}
          >
            <Typography variant="h6">Get Started</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'black', color: 'white', padding: 3, borderRadius: 1 }}>
            <Typography variant="h6">Getting Started with YoGPT</Typography>
            <Typography mt={2}>
              To begin, tap on "Create New Job" on the home screen. Fill in the training job form with the necessary details such as model type, dataset, and hyperparameters. Advanced settings are available for configuring training rounds and other parameters for technical users.
              <Box mt={2}>
                <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white' }} href="https://example.com/get-started" target="_blank">Read More</Button>
              </Box>
            </Typography>
            <Typography mt={2}>
              Once the form is completed, submit it to initiate the fine-tuning process. You can monitor the job status and view results directly on the platform. Detailed instructions and guides are available.
              <Box mt={2}>
                <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white' }} href="https://example.com/documentation" target="_blank">Read More</Button>
              </Box>
            </Typography>
            <Typography mt={2}>
              For billing details, please refer to our pricing page.
              <Box mt={2}>
                <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white' }} href="https://example.com/pricing" target="_blank">Read More</Button>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'fineTuning'} onChange={handleChange('fineTuning')} sx={{ backgroundColor: 'black', color: 'white', marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            aria-controls="fineTuning-content"
            id="fineTuning-header"
            sx={{ backgroundColor: '#333', padding: 2, borderRadius: 1 }}
          >
            <Typography variant="h6">Fine-Tuning</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'black', color: 'white', padding: 3, borderRadius: 1 }}>
            <Typography variant="h6">Fine-Tuning Capabilities</Typography>
            <Typography mt={2}>
              YoGPT supports fine-tuning of several powerful models:
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
              <Box mt={2}>
                <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white' }} href="https://example.com/fine-tuning" target="_blank">Read More</Button>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'deploying'} onChange={handleChange('deploying')} sx={{ backgroundColor: 'black', color: 'white', marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            aria-controls="deploying-content"
            id="deploying-header"
            sx={{ backgroundColor: '#333', padding: 2, borderRadius: 1 }}
          >
            <Typography variant="h6">Deploying Models</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'black', color: 'white', padding: 3, borderRadius: 1 }}>
            <Typography>
              Once your model is fine-tuned, you can deploy it on the YoGPT platform for seamless interaction and integration. The platform provides an easy-to-use API for inference and interaction, allowing you to incorporate the model into your applications. Subscription options for the API are available to suit different needs.
              <Box mt={2}>
                <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white' }} href="https://example.com/deploy" target="_blank">Read More</Button>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'billing'} onChange={handleChange('billing')} sx={{ backgroundColor: 'black', color: 'white', marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            aria-controls="billing-content"
            id="billing-header"
            sx={{ backgroundColor: '#333', padding: 2, borderRadius: 1 }}
          >
            <Typography variant="h6">Billing and Pricing</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'black', color: 'white', padding: 3, borderRadius: 1 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Pricing for Training Jobs
              </Typography>
              <Typography mt={2}>
                Detailed information about the pricing for training jobs can be found on our pricing page.
                <Box mt={2}>
                  <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white' }} href="https://example.com/training-pricing" target="_blank">Read More</Button>
                </Box>
              </Typography>
              <Typography variant="h6" gutterBottom mt={2}>
                Pricing for Inference
              </Typography>
              <Typography mt={2}>
                For information on pricing for inference services, please refer to our detailed pricing section.
                <Box mt={2}>
                  <Button variant="contained" sx={{ backgroundColor: 'green', color: 'white' }} href="https://example.com/inference-pricing" target="_blank">Read More</Button>
                </Box>
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default UserDocComponent;
