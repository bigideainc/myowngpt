import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from "./auth/AuthContext";
import AuthModal from "./auth/AuthModal";
import { auth } from "./auth/config/firebase-config";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import ChatLayout from "./screens/pages/chat/ChatLayout";
import LLMSScreen from "./screens/pages/llms/LLMSScreen";
import ModelsScreen from "./screens/pages/llms/models";
import PaymentMenu from "./screens/pages/payment/menu";
import TrainingJobs from "./screens/pages/trainer/jobs";
import SignIn from "./screens/sign-in";
import SignUp from "./screens/sign-up";
import { Footer } from "./widgets/Footer";
import LoadingScreen from "./widgets/LoadingScreen";
import UserInfoPopup from "./widgets/userInfo";

// Function to fetch models from Hugging Face
const fetchModelDetails = async (modelId) => {
  try {
    const response = await fetch(`https://huggingface.co/api/models/${modelId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch details for model ${modelId}`);
    }
    const modelDetails = await response.json();
    const numParameters = modelDetails.safetensors?.parameters?.F32;

    return {
      modelId: modelId,
      numParameters: numParameters || "N/A" // Provide a default value if parameters are not available
    };
  } catch (error) {
    console.error(`Error fetching model details for ${modelId}:`, error);
    return { modelId: modelId, numParameters: "Error fetching details" }; // Return default error state
  }
};

const fetchModelsFromHuggingFace = async () => {
  try {
    const response = await fetch("https://huggingface.co/api/models");
    if (!response.ok) {
      throw new Error("Failed to fetch models");
    }
    const models = await response.json();

    const detailsPromises = models.map(model => fetchModelDetails(model.modelId));
    const results = await Promise.allSettled(detailsPromises);
    const modelsDetails = results.map(result => result.status === "fulfilled" ? result.value : null).filter(detail => detail !== null);

    if (modelsDetails.length > 0) {
      localStorage.setItem("hfModelsDetails", JSON.stringify(modelsDetails));
    } else {
      console.log("No models with parameters were found to save.");
    }
  } catch (error) {
    console.error("Error fetching models from Hugging Face:", error);
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAuthModel, setShowAuthModel] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state to true
  const location = useLocation();

  useEffect(() => {
    const handleStartLoading = () => setIsLoading(true);
    const handleStopLoading = () => setIsLoading(false);

    handleStartLoading();
    // Simulating fetch/loading operation
    const timer = setTimeout(handleStopLoading, 500); // Simulate loading time

    // Cleanup function to clear timer when component unmounts or location changes
    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    // Call the function to fetch models when the component mounts
    fetchModelsFromHuggingFace().then(() => setIsLoading(false)); // Stop loading after fetching models
  }, []);

  const toggleProfileWidget = () => setIsProfileClicked(!isProfileClicked);

  // Listen for changes in the authentication state
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setIsAuthenticated(true);
      } else {
        // User is signed out.
        setIsAuthenticated(false);
      }
    });
    themeCheck();
  }, []);

  const navigate = useNavigate(); // Define useNavigate hook here

  const handleExploreClick = (title, link) => {
    if (isAuthenticated) {
      setCurrentTitle(title);
      setShowAlert(true);
      // Navigate to the provided link
      if (link) {
        navigate(link);
      }
    } else {
      setShowAuthModel(true);
    }
  };

  // Initial Theme Check
  useEffect(() => {
    themeCheck();
  }, []);

  const themeCheck = () => {
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (localStorage.theme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
      setIsDarkTheme(true);
    } else {
      document.documentElement.classList.add("light");
      setIsDarkTheme(false);
    }
  };

  // Manual Theme Switch
  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsDarkTheme(false);
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setIsDarkTheme(true);
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const [user, setUser] = useState({
    isAuthenticated: false,
    name: '',
    email: '',
    photoURL: ''
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser({
          isAuthenticated: true,
          name: user.displayName || 'No Name',
          email: user.email,
          photoURL: user.photoURL || 'path/to/default/image.png'
        });
      } else {
        // User is signed out
        setUser({
          isAuthenticated: false,
          name: '',
          email: '',
          photoURL: ''
        });
      }
    });
  }, []);

  return (
    <AuthProvider>
    <div className="flex flex-col">
      {isLoading && <LoadingScreen />} 
      {!isLoading && (
        <Routes>
          <Route path="/" element={
            <>
              {showAuthModel && (
                <AuthModal onClose={() => setShowAuthModel(false)} />
              )}
              {isProfileClicked && (
                <UserInfoPopup
                  onClose={() => setIsProfileClicked(false)}
                  userName={user.name}
                  userEmail={user.email}
                  userPhotoURL={user.photoURL}
                />
              )}
              <Navbar
                isDarkTheme={isDarkTheme}
                themeSwitch={themeSwitch}
                toggleMobileMenu={toggleMobileMenu}
                isMobileMenuOpen={isMobileMenuOpen}
                onProfileClick={toggleProfileWidget} // Passing the function as a prop
              />
              <div className="flex flex-1 bg-slate-100 dark:bg-slate-900">
                <div className="flex-1 p-10 px-8  pt-20 pb-0 ">
                  <MainContent handleExploreClick={handleExploreClick} />
                </div>
              </div>
              <Footer />
            </>
          } />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/llms" element={<LLMSScreen />} />
          <Route path="/jobs" element={<TrainingJobs />} />
          <Route path="/models" element={<ModelsScreen />} />
          <Route path="/payment" element={<PaymentMenu />} />
          <Route path="/chat/:url" element={<ChatLayout />} />
        </Routes>
      )}
    </div>
    </AuthProvider>
  );
}

export default App;
