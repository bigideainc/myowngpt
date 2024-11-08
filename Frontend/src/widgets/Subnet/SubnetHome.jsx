import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsBell, BsMoon, BsSun } from 'react-icons/bs';
import { FaApple, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiAmd, SiIntel, SiNvidia } from 'react-icons/si';
import { Link } from 'react-router-dom';
import GPUSelectionApp from './ClusterDeployment';
import Demo from './HeatMap';
import World from './Nodes/Globe.jsx';
import defaultMarkers from "./Nodes/markers.js";
import ClusterDashboard from './subnet';

const SubnetHome = () => {
    const [isMinersView, setIsMinersView] = useState(false);
    const [isChipView, setIsChipView] = useState(false);
    const [activeNav, setActiveNav] = useState('Home');
    const [darkMode, setDarkMode] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState('All Providers');
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const providers = [
        { name: 'All Providers', gpus: 'N/A', cpus: 'N/A' },
        { name: 'IO Workers', gpus: '5K', cpus: '120K' },
        { name: 'Filecoin', gpus: '88.37K', cpus: '150.15K' },
        { name: 'RNDR', gpus: '88.37K', cpus: '3.5K' },
        { name: 'Lambda', gpus: '15.6K', cpus: '400' }
    ];

    const gpuData = [
        { provider: 'IO Workers', icon: <SiNvidia className="text-green-500" />, name: 'RTX 3060', supply: 23, price: '$0.18/hr', change: '+4%', utilization: 64 },
        { provider: 'Filecoin', icon: <SiNvidia className="text-green-500" />, name: 'RTX 4090', supply: 12, price: '$0.37/hr', change: '-3%', utilization: 55 },
        { provider: 'RNDR', icon: <SiNvidia className="text-green-500" />, name: 'RTX A6000', supply: 190, price: '$0.45/hr', change: '+3%', utilization: 50 },
        { provider: 'Lambda', icon: <SiNvidia className="text-green-500" />, name: 'A100 PCIe 80 Gb', supply: 77, price: '$0.18/hr', change: '+4%', utilization: 42 },
        { provider: 'RNDR', icon: <SiIntel className="text-blue-500" />, name: 'Xeon Platinum 8380', supply: 7, price: '$0.05/hr', change: '+2%', utilization: 0 },
        { provider: 'Filecoin', icon: <SiAmd className="text-red-500" />, name: 'EPYC 7763', supply: 3, price: '$0.3/hr', change: '-2%', utilization: 0 },
        { provider: 'IO Workers', icon: <FaApple className="text-gray-500" />, name: 'Apple M2 Max', supply: 77, price: '$0.05/hr', change: '+1%', utilization: 0 }
    ];

    const handleNavClick = (nav) => {
        setActiveNav(nav);
        setIsMinersView(nav === 'Miners');
        setIsChipView(nav === 'Chips');
        setIsMobileNavOpen(false); // Close mobile nav on selection
    };

    const handleProviderClick = (provider) => {
        setSelectedProvider(provider.name);
    };

    const filteredGpuData = selectedProvider === 'All Providers'
        ? gpuData
        : gpuData.filter(gpu => gpu.provider === selectedProvider);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen flex flex-col`}>
            {/* Fixed Top Navigation */}
            <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm py-4 px-6 sm:px-8 flex items-center justify-between fixed top-0 left-0 right-0 z-10`}>
            <Link to="/" className="flex items-center gap-2">
        <span className="text-lg font-semibold">YOGPT</span>
        <span className="text-gray-400 hidden sm:block">/</span>
        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} hidden sm:block`}>COMMUNEX</span>
    </Link>
                {/* <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">YOGPT</span>
                    <span className="text-gray-400 hidden sm:block">/</span>
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} hidden sm:block`}>COMMUNEX</span>
                </div> */}
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {['Home', 'Chips', 'Miners', 'Validators', 'Earnings & Rewards', 'Inference'].map((nav) => (
                        <button
                            key={nav}
                            onClick={() => handleNavClick(nav)}
                            className={`font-medium ${activeNav === nav ? 'border-b-2 border-gray-800' : `${darkMode ? 'text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}`}
                            disabled={nav === 'Inference'}
                        >
                            {nav}
                        </button>
                    ))}
                </nav>
                <div className="flex items-center gap-4 text-gray-600">
                    <a href="#changelog" className={`${darkMode ? 'text-gray-300' : ''} hidden sm:block`}>Changelog</a>
                    <a href="#docs" className={`${darkMode ? 'text-gray-300' : ''} hidden sm:block`}>Docs</a>
                    <a href="#faqs" className={`${darkMode ? 'text-gray-300' : ''} hidden sm:block`}>FAQs</a>
                    <a href="#help" className={`${darkMode ? 'text-gray-300' : ''} hidden sm:block`}>Help</a>
                    <BsBell className={`text-xl cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                    <AiOutlineUser className={`text-2xl cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                    <button className="md:hidden" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
                        ☰
                    </button>
                </div>
            </header>

            {/* Main Content with Scrollable Area */}
            <main className={`flex-1 overflow-y-auto pt-20 pb-24 px-6 flex justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="w-full max-w-8xl">
                    {isChipView ? (
                        <GPUSelectionApp darkMode={darkMode} />
                    ) : isMinersView ? (
                        <ClusterDashboard darkMode={darkMode} />
                    ) : (
                        <div className="rounded-lg">
                        <World initialMarkers={defaultMarkers} darkMode={darkMode} />
                        

                            {/* YOGPT Summary Section */}
                            <div className={`w-full lg:w-2/3 mx-auto p-6 pt-0 border-b lg:border-b-0 ${darkMode ? 'border-gray-700' : 'border-white'}`}>
                                <h3 className="text-lg font-semibold mb-4 text-center">YOGPT</h3>
                                <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-4 text-center`}>
                                    Supply Insights and Overview
                                </h4>
                                <div className="grid grid-cols-12 gap-1 mb-4">
                                    <Demo darkMode={darkMode} />

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Fixed Footer */}
            <footer className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} p-6 fixed bottom-0 left-0 right-0 flex flex-col sm:flex-row justify-between items-center text-sm z-10`}>
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                    <span className="text-lg font-semibold">YOGPT</span>
                    <span className="text-blue-500">•</span>
                    <span className="text-blue-500">All rights reserved</span>
                </div>
                <div className="flex items-center gap-4 mb-2 sm:mb-0">
                    <FaGithub className="cursor-pointer hover:text-gray-700" />
                    <FaLinkedin className="cursor-pointer hover:text-gray-700" />
                    <FaTwitter className="cursor-pointer hover:text-gray-700" />
                    <FaInstagram className="cursor-pointer hover:text-gray-700" />
                    <FaFacebook className="cursor-pointer hover:text-gray-700" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-gray-400">©2024, YOGPT, inc.</div>
                    {darkMode ? (
                        <BsSun onClick={toggleDarkMode} className="cursor-pointer text-yellow-400 hover:text-yellow-500" />
                    ) : (
                        <BsMoon onClick={toggleDarkMode} className="cursor-pointer text-gray-700 hover:text-gray-800" />
                    )}
                </div>
            </footer>
        </div>
    );
};

export default SubnetHome;
