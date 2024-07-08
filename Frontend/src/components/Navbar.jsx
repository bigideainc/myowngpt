import { onAuthStateChanged, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from '../auth/config/firebase-config';

const Navbar = ({ onProfileClick }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  return (
    <nav className="bg-green-400 fixed top-0 left-0 w-full z-10" style={{ backgroundColor: '#099D51', fontFamily: 'Poppins', fontSize: '15px' }}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-between sm:items-stretch">
            <Link
              to="/"
              className={`${location.pathname === '/' ? 'bg-black-500/40 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium`}
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              <svg
                className="h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 44 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0H8m0 0v6"
                />
              </svg>
            </Link>
            <div className="hidden sm:flex sm:items-center sm:justify-end flex-1 space-x-4">
              {authCheckCompleted && !isAuthenticated ? (
                <>
                  <Link to="/sign-in" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                  <Link to="/sign-up" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                </>
              ) : (
                <>
                  <Link to="/"
                    href="#"
                    className="text-white  hover:text-gray-300 rounded-md px-3 py-2 text-xl font-bold"
                  >
                    Community
                  </Link>
                  <Link
                    to="/pricing"
                    className={`${location.pathname === '/pricing' ? 'bg-green-500/40 text-white' : 'text-white hover:text-gray-300'} rounded-md px-3 py-2 text-xl font-bold`}
                  >
                    Pricing
                  </Link>
                  {isAuthenticated && (
                    <div className="relative ml-3">
                      <button
                        type="button"
                        className="p-2 relative flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={toggleProfileDropdown}
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={userPhotoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                          alt="User Profile"
                        />
                        <span className="ml-2 text-white hidden sm:inline-block">{userName || "User"}</span>
                      </button>
                      {isProfileDropdownOpen && (
                        <div
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu-button"
                          tabIndex={-1}
                        >
                          <div
                            onClick={onProfileClick}
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex={-1}
                            id="user-menu-item-0"
                          >
                            Profile
                          </div>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex={-1}
                            id="user-menu-item-1"
                          >
                            Settings
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex={-1}
                            id="user-menu-item-2"
                            onClick={handleSignOut}
                          >
                            Sign out
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className="bg-green-500/40 text-white block rounded-md px-3 py-2 text-base font_medium"
              aria-current="page"
            >
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0H8m0 0v6"
                />
              </svg>
            </Link>
            {authCheckCompleted && !isAuthenticated ? (
              <>
                <Link to="/sign-in" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Login</Link>
                <Link to="/sign-up" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Sign Up</Link>
              </>
            ) : (
              <>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Community
                </a>
                <Link
                  to="/pricing"
                  className={`${location.pathname === '/pricing' ? 'bg-green-500/40 ' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} block rounded-md px-3 py-2 text-base font-medium`}
                >
                  Pricing
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  onProfileClick: PropTypes.func.isRequired,
};

export default Navbar;
