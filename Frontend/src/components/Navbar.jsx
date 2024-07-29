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
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
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

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={onProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          Home
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/models" style={{ color: 'inherit', textDecoration: 'none' }}>
          Models
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
          Dashboard
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/datasets" style={{ color: 'inherit', textDecoration: 'none' }}>
          Datasets
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/docs" style={{ color: 'inherit', textDecoration: 'none' }}>
          Docs
        </Link>
      </MenuItem>
      {authCheckCompleted && isAuthenticated && (
        <MenuItem onClick={handleMenu}>
          <img
            src={userPhotoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
            alt="User Profile"
            style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '10px' }}
          />
          <Typography variant="body2" style={{ fontWeight: '500' }}>
            {userName}
          </Typography>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <AppBar position="fixed" style={{ background: 'linear-gradient(135deg, #6e8efb, #a777e3)', fontFamily: 'Roboto, sans-serif' }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleMobileMenuOpen}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', md: 'block' } }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: '500' }}>AI Hub</Link>
        </Typography>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
          <Typography variant="h6" component="div" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <Link to="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>Home</Link>
            <Link to="/models" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>Models</Link>
            <Link to="/llms" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>Dashboard</Link>
            <Link to="/datasets" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>Datasets</Link>
            <Link to="/docs" style={{ margin: '0 15px', color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' }}>Docs</Link>
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
                style={{ display: 'flex', alignItems: 'center', color: 'white', textTransform: 'none' }}
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
          </>
        )}
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
};

Navbar.propTypes = {
  onProfileClick: PropTypes.func.isRequired,
};

export default Navbar;
