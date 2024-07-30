import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { auth, signInWithGoogle } from '../auth/config/firebase-config'; // import signInWithGoogle function
import PopUp from '../widgets/LoginPopUp';
import NewPopup from '../widgets/ServicesPopUp';
import ModelCard from './ModelCard'; // Import the ModelCard component
import ModelDetailsModal from './ModelDetailsModal';

const networks = [
  {
    name: 'Bittensor',
    description: 'Decentralized AI network',
    icon: 'https://bittensor.com/favicon.ico',
  },
  {
    name: 'Commune',
    description: 'Community-driven AI platform',
    icon: 'https://avatars.githubusercontent.com/u/107713514?v=4',
  },
  {
    name: 'Hugging Face',
    description: 'Open-source NLP models',
    icon: 'https://huggingface.co/favicon.ico',
  },
  {
    name: 'OpenAI',
    description: 'State-of-the-art language models',
    icon: 'https://openai.com/favicon.ico',
    comingSoon: true,
  },
  {
    name: 'Anthropic',
    description: 'Advanced AI research and models',
    icon: 'https://www.anthropic.com/favicon.ico',
    comingSoon: true,
  },
];

const models = [
  {
    name: 'GPT2 ',
    id: 'openai-community/gpt2',
    description: 'Text Generation',
    lastUsed: '3 hours ago',
    usageCount: '339k'
  },
  {
    name: 'GPT-2 Medium',
    id: 'openai-community/gpt2-medium',
    description: 'Text Generation',
    lastUsed: '5 days ago',
    usageCount: '48.5k'
  },
  {
    name: 'GPT-2 Large',
    id: 'openai-community/gpt2-large',
    description: 'Text Generation',
    lastUsed: '3 hours ago',
    usageCount: '17.7k'
  },
  {
    name: 'LLaMA-2 7B',
    id: 'openlm-research/open_llama_7b_v2',
    description: 'Text Generation',
    lastUsed: '3 hours ago',
    usageCount: '66.1k'
  },
  {
    name: 'LLaMA-2 13B',
    id: 'openlm-research/open_llama_13b',
    description: 'Text Generation',
    lastUsed: '17 days ago',
    usageCount: '121k'
  },
  {
    name: 'NousResearch llama2',
    id: 'NousResearch/Llama-2-7b-chat-hf',
    description: 'Text Generation',
    lastUsed: '5 days ago',
    usageCount: '616'
  },
  {
    name: 'OpenELM 270M',
    id: 'apple/OpenELM-270M',
    description: 'Text Generation',
    lastUsed: '21 hours ago',
    usageCount: '84.8k'
  },
  {
    name: 'OpenELM 450M',
    id: 'apple/OpenELM-450M',
    description: 'Text Generation',
    lastUsed: '4 days ago',
    usageCount: '3.47k'
  },
  {
    name: 'OpenELM 3B',
    id: 'apple/OpenELM-3B',
    description: 'Text Generation',
    lastUsed: '3 days ago',
    usageCount: '77.8k'
  },
];

const MainContent = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [newPopupOpen, setNewPopupOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleGetStartedClick = () => {
    if (user) {
      setNewPopupOpen(true);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewPopupClose = () => {
    setNewPopupOpen(false);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCardClick = (model) => {
    if (!user) {
      signInWithGoogle().then((result) => {
        setUser(result);
        setSelectedModel(model);
      }).catch((error) => {
        console.error('Google sign-in error', error);
      });
    } else {
      setSelectedModel(model);
    }
  };

  const handleModalClose = () => {
    setSelectedModel(null);
  };

  const filteredModels = models.filter(model => model.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Box className="min-h-screen bg-gray-100" sx={{ marginTop: "90px", marginBottom: "90px", minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'column' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" color="textPrimary" gutterBottom style={{ fontSize: '2.0rem', fontWeight: '700' }}>
          AI Model Fine-Tuning Hub
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" gutterBottom style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '15px' }}>
          Available Networks
        </Typography>

        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {networks.slice(0, 4).map((network) => (
            <Grid item xs={12} sm={6} md={3} key={network.name}>
              <Card
                onClick={() => network.comingSoon ? alert(`${network.name} Coming Soon!`) : alert(`${network.name} Selected`)}
                sx={{
                  height: 200,  // Set a fixed height
                  background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
                  color: '#fff',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardContent align="center">
                  {network.icon.startsWith('http') ? (
                    <img src={network.icon} alt={network.name} style={{ width: '80px', height: '80px', marginBottom: '10px' }} />
                  ) : (
                    <i className={`${network.icon} fa-6x mb-4`}></i>
                  )}
                  <Typography variant="h5" component="div">
                    {network.name}
                  </Typography>
                  <Typography variant="body2">
                    {network.description}
                  </Typography>
                  {network.comingSoon && (
                    <Typography variant="body2" style={{ color: '#ffd700', marginTop: '5px' }}>
                      Coming Soon
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Card
              onClick={() => networks[4].comingSoon ? alert(`${networks[4].name} Coming Soon!`) : alert(`${networks[4].name} Selected`)}
              sx={{
                height: 200,  // Set a fixed height
                background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
                color: '#fff',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <CardContent align="center">
                {networks[4].icon.startsWith('http') ? (
                  <img src={networks[4].icon} alt={networks[4].name} style={{ width: '80px', height: '80px', marginBottom: '10px' }} />
                ) : (
                  <i className={`${networks[4].icon} fa-6x mb-4`}></i>
                )}
                <Typography variant="h5" component="div">
                  {networks[4].name}
                </Typography>
                <Typography variant="body2">
                  {networks[4].description}
                </Typography>
                {networks[4].comingSoon && (
                  <Typography variant="body2" style={{ color: '#ffd700', marginTop: '5px' }}>
                    Coming Soon
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h4" align="center" color="textPrimary" gutterBottom style={{ fontSize: '2.0rem', fontWeight: '700', marginTop: '50px' }}>
          Models
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" gutterBottom style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '15px' }}>
          Select a model to fine-tune today...
        </Typography>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {filteredModels.map((model) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={model.id}>
              <ModelCard model={model} onClick={() => handleCardClick(model)} /> {/* Use the reusable ModelCard component */}
            </Grid>
          ))}
        </Grid>
      </Container>

      <PopUp open={open} onClose={handleClose} />
      <NewPopup open={newPopupOpen} onClose={handleNewPopupClose} />
      {selectedModel && (
        <ModelDetailsModal open={!!selectedModel} onClose={handleModalClose} model={selectedModel} />
      )}
    </Box>
  );
};

export default MainContent;
