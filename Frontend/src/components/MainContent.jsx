import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Stack, Typography, Container, useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { auth } from '../auth/config/firebase-config';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  '&.learn-more': {
    backgroundColor: '#28a745',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#218838',
    },
  },
  '&.get-started': {
    borderColor: '#28a745',
    color: '#28a745',
    '&:hover': {
      backgroundColor: '#28a745',
      color: '#fff',
    },
  },
  '&.disabled': {
    color: '#B0B0B0',
    backgroundColor: '#E0E0E0',
    '&:hover': {
      backgroundColor: '#E0E0E0',
    },
  },
}));

const ListItem = styled('li')(({ theme }) => ({
  position: 'relative',
  paddingLeft: theme.spacing(3),
  marginBottom: theme.spacing(2),
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'MediumSeaGreen',
  },
}));

const GreenTickListItem = styled(ListItem)({
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '24px',
    height: '24px',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'mediumseagreen\'%3E%3Cpath d=\'M9.71 16.29l-3.42-3.42 1.42-1.42 2 2 5-5 1.42 1.42z\'/%3E%3C/svg%3E")',
    backgroundSize: 'cover',
    borderRadius: '50%',
    backgroundColor: 'transparent',
  },
});

const MainContent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleGetStartedClick = () => {
    navigate(user ? '/jobs' : '/sign-in');
  };

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#ffd433', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box sx={{
        py: { xs: 2, sm: 4, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          mx: 'auto',
        }}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 }, flex: 1, px: { xs: 2, md: 4 } }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '36px', sm: '48px', md: '54px' }, fontFamily: 'Poppins', color: 'black', mb: 2 }}>
              <b>Your Own GPT</b>
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', pl: 0, fontFamily: 'Poppins', fontSize: { xs: '16px', sm: '20px', md: '24px' }, color: 'black', mb: 4, lineHeight: 1.5 }}>
              <GreenTickListItem>
                <b>Fine-Tune</b> Models for your exact need.
              </GreenTickListItem>
              <GreenTickListItem>
                Use any dataset from <b>huggingface</b>.
              </GreenTickListItem>
              <GreenTickListItem>
                Deploy and <b>Chat</b> with your Model.
              </GreenTickListItem>
              <GreenTickListItem>
                <b>No coding</b> required.
              </GreenTickListItem>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <StyledButton variant="outlined" className="get-started" onClick={handleGetStartedClick} style={{ fontSize: '20px', fontWeight: 'bold', color: 'green' }}>
                Get Started <ArrowForwardIcon sx={{ ml: 1 }} />
              </StyledButton>
            </Stack>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1, mt: { xs: 4, md: 0 }, px: { xs: 2, md: 4 } }}>
           <Box
              sx={{
                width: '100%',
                maxWidth: '8000px',
                height: 'auto',
                borderRadius: '50%',
                backgroundColor: 'white',
                padding: 2,
                boxShadow: theme.shadows[4],
                transform: 'rotate(-30deg)', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                src="/static/img/jarvis.png"
                alt="Jarvis"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  transform: 'rotate(30deg)',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default MainContent;
