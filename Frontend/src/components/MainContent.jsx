import '@fortawesome/fontawesome-free/css/all.min.css';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { auth } from '../auth/config/firebase-config';
import PopUp from '../widgets/LoginPopUp';
import NewPopup from '../widgets/ServicesPopUp';

const networks = [
  {
    name: 'Bittensor',
    description: 'Decentralized AI network',
    icon: 'https://bittensor.com/favicon.ico',
  },
  {
    name: 'Commune',
    description: 'Community-driven AI platform',
    icon: 'https://communeai.org/commune-logo-white.svg',
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

const MainContent = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [newPopupOpen, setNewPopupOpen] = useState(false);

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

  return (
    <Box className="min-h-screen bg-gray-100" sx={{ marginTop: "70px", minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
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
      </Container>

      <PopUp open={open} onClose={handleClose} />
      <NewPopup open={newPopupOpen} onClose={handleNewPopupClose} />
    </Box>
  );
};

export default MainContent;
