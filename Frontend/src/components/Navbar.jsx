import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from '../auth/config/firebase-config';

const Navbar = ({ onProfileClick }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userPhotoURL, setUserPhotoURL] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserPhotoURL(user.photoURL || 'path/to/default/image.png');
        setUserEmail(user.email);
        setUserName(user.displayName || "No Name");
      } else {
        setIsAuthenticated(false);
        setUserPhotoURL('');
        setUserEmail('');
        setUserName('');
      }
      setAuthCheckCompleted(true);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Sign out error', error);
    });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" style={{ background: 'linear-gradient(135deg, #6e8efb, #a777e3)', fontFamily: 'Roboto, sans-serif' }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <Typography variant="h6" component="div" style={{ display: 'flex' }}>
            <Link to="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>Home</Link>
            <Link to="/models" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>Models</Link>
            <Link to="/dashboard" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>Dashboard</Link>
            <Link to="/datasets" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>Datasets</Link>
          </Typography>
        </div>
        {authCheckCompleted && !isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/sign-in" style={{ color: 'white' }}>Login</Button>
            <Button color="inherit" component={Link} to="/sign-up" style={{ color: 'white' }}>Sign Up</Button>
          </>
        ) : (
          <>
            {isAuthenticated && (
              <Button
                onClick={handleMenu}
                style={{ display: 'flex', alignItems: 'right', color: 'white', textTransform: 'none' }}
              >
                <img
                  src={userPhotoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                  alt="User Profile"
                  style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '10px' }}
                />
                <Typography variant="body2" style={{ fontWeight: '500' }}>
                  {userName}
                </Typography>
              </Button>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={onProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  onProfileClick: PropTypes.func.isRequired,
};

export default Navbar;
