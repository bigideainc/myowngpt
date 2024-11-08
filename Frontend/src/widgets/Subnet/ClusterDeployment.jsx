import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaMemory, FaMicrochip } from 'react-icons/fa';
import { SiAmd, SiNvidia } from 'react-icons/si';
import { db } from '../../auth/config/firebase-config';
import ChipSelection from './ConnectivitySelection';
import OwnComputerCard from './Nodes/UseOwnComputerCard';

const SelectionPanel = ({ selectedGPU, darkMode, onContinue }) => {
    // Determine availability based on containers
    const isFullyAvailable = selectedGPU && selectedGPU.status === 'available';
    const hasAvailableContainer = selectedGPU && selectedGPU.containers && selectedGPU.containers.some(container => container.status === 'available');
    const hasInUseContainer = selectedGPU && selectedGPU.containers && selectedGPU.containers.some(container => container.status === 'in-use');

    // Determine actual availability status
    const availabilityStatus = isFullyAvailable
        ? 'available'
        : hasAvailableContainer && hasInUseContainer
            ? '50% available'
            : 'in-use';

    // Determine if the Continue button should be enabled
    const canContinue = selectedGPU === 'ownComputer' || availabilityStatus !== 'in-use';

    // Prepare specifications text
    const specificationsText = selectedGPU && selectedGPU.specifications
        ? `${selectedGPU.specifications.cpuInfo}, ${selectedGPU.specifications.cores} Cores, ${selectedGPU.specifications.cpuMaxMHz} MHz, ${selectedGPU.specifications.memory}, ${selectedGPU.specifications.storage}`
        : "No specifications available";

    return (
        <div className={`
            rounded-xl p-6 h-fit sticky top-4
            ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
            shadow-xl ${darkMode ? 'shadow-gray-900/30' : 'shadow-gray-200/50'}`}>
            <h2 className="text-xl font-bold mb-4">Selected Hardware</h2>

            {!selectedGPU && (
                <div className="text-center py-8">
                    <FaMicrochip className={`text-4xl mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No hardware selected
                    </p>
                </div>
            )}

            {selectedGPU && selectedGPU !== 'ownComputer' && (
                <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <div className="flex items-start space-x-3">
                            {selectedGPU.brand === 'Nvidia' ?
                                <SiNvidia className="text-2xl mt-1" /> :
                                <SiAmd className="text-2xl mt-1" />
                            }
                            <div>
                                <h3 className="font-medium">{selectedGPU.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {selectedGPU.description || 'No description available'}
                                </p>
                                <p className="text-sm mt-2">Status: {availabilityStatus}</p>
                                <p className="text-sm mt-2">Cost per hour: {selectedGPU.costPerHour ? `$${selectedGPU.costPerHour}` : 'N/A'}</p>
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-sm">{specificationsText}</p>
                        </div>
                    </div>
                </div>
            )}

            {selectedGPU === 'ownComputer' && (
                <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900">
                        <h3 className="font-medium text-purple-900 dark:text-purple-300">Using Personal Computer</h3>
                        <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                            Ensure your system meets the minimum requirements
                        </p>
                        <p className="text-sm mt-2">Status: Available</p>
                    </div>
                </div>
            )}

            <button
                onClick={onContinue}
                className={`
                    w-full mt-6 py-2 px-4 rounded-lg font-medium transition-colors
                    ${canContinue ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 cursor-not-allowed'}`}
                disabled={!canContinue}
            >
                Continue
            </button>
        </div>
    );
};

const HardwareCard = ({ hardware, isSelected, onSelect, darkMode }) => {
    const isGPU = hardware.type === 'GPU';

    // Generate a compact specifications string
    const specificationsText = hardware.specifications
        ? `${hardware.specifications.cpuInfo}, ${hardware.specifications.cores} Cores, ${hardware.specifications.cpuMaxMHz} MHz, ${hardware.specifications.memory}, ${hardware.specifications.storage}`
        : "No specifications available";

    // Determine the display status for the card based on container availability
    const hasAvailableContainer = hardware.containers && hardware.containers.some(container => container.status === 'available');
    const hasInUseContainer = hardware.containers && hardware.containers.some(container => container.status === 'in-use');
    const displayStatus = hardware.status === 'available'
        ? 'available'
        : hasAvailableContainer && hasInUseContainer
            ? '50% available'
            : 'in-use';

    return (
        <div
            className={`relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer
                ${isSelected
                    ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20'
                    : `shadow-md ${darkMode ? 'shadow-gray-900/30' : 'shadow-gray-200/50'}`}
                ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            onClick={() => onSelect(hardware.id)}
        >
            {/* Header */}
            <div className={`p-4 ${isGPU
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600'}`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {hardware.brand === 'Nvidia' ?
                            <SiNvidia className="text-white text-xl" /> :
                            <SiAmd className="text-white text-xl" />
                        }
                        <h3 className="font-bold text-white text-lg truncate">{hardware.name}</h3>
                    </div>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                        {hardware.type}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    {/* Memory Section */}
                    <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <FaMemory className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Memory</p>
                            <p className="font-medium text-sm">{hardware.memory}</p>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <FaMapMarkerAlt className={`${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                        </div>
                        <div>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                            <p className="font-medium text-sm">{hardware.location}</p>
                        </div>
                    </div>
                </div>

                {/* Specifications Section */}
                <div className={`mt-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Specifications</p>
                    <p className="text-sm mt-1 leading-relaxed">{specificationsText}</p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center justify-evenly mt-2">
                        {/* Model Badge */}
                        <span className={`text-xs px-3 mr-2 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            {hardware.model}
                        </span>

                        {/* Status Badge with dynamic background color */}
                        <span className={`
            text-xs px-3 py-1 rounded-full 
            ${displayStatus === 'available' ? 'bg-green-100 text-green-700' : ''}
            ${displayStatus === 'in-use' ? 'bg-red-100 text-red-700' : ''}
            ${displayStatus === '50% available' ? 'bg-yellow-100 text-yellow-700' : ''}
        `}>
                            Status: {displayStatus}
                        </span>
                    </div>

                    {/* Radio Button for Selection */}
                    <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => onSelect(hardware.id)}
                        className="w-4 h-4 text-blue-600"
                    />
                </div>            </div>
        </div>
    );
};

const GPUSelectionApp = ({ darkMode }) => {
    const [hardwareData, setHardwareData] = useState([]);
    const [selectedGPUId, setSelectedGPUId] = useState(null);
    const [filter, setFilter] = useState('All');
    const [isConnectivityScreen, setIsConnectivityScreen] = useState(false);

    useEffect(() => {
        const gpuCollectionRef = collection(db, 'hardware', 'gpu', 'items');
        const cpuCollectionRef = collection(db, 'hardware', 'cpu', 'items');

        // Real-time listener for GPU collection
        const unsubscribeGpu = onSnapshot(gpuCollectionRef, (snapshot) => {
            const gpuData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), type: 'GPU' }));
            setHardwareData((prevData) => [...prevData.filter(item => item.type !== 'GPU'), ...gpuData]);
        });

        // Real-time listener for CPU collection
        const unsubscribeCpu = onSnapshot(cpuCollectionRef, (snapshot) => {
            const cpuData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), type: 'CPU' }));
            setHardwareData((prevData) => [...prevData.filter(item => item.type !== 'CPU'), ...cpuData]);
        });

        // Cleanup listeners on component unmount
        return () => {
            unsubscribeGpu();
            unsubscribeCpu();
        };
    }, []);

    const handleSelectGPU = (id) => setSelectedGPUId(id);
    const handleFilterChange = (newFilter) => setFilter(newFilter);
    const handleContinue = () => setIsConnectivityScreen(true);

    // Filter the hardware data based on selected filter
    const filteredHardwareData = hardwareData.filter((hardware) => {
        if (filter === 'All') return true;
        if (filter === 'CPU' || filter === 'GPU') return hardware.type === filter;
        return hardware.brand === filter; // Filter by brand (e.g., Nvidia, Intel)
    });

    const selectedGPU = selectedGPUId === 'ownComputer'
        ? 'ownComputer'
        : hardwareData.find((hardware) => hardware.id === selectedGPUId);

    if (isConnectivityScreen) {
        return <ChipSelection darkMode={darkMode} selectedGPU={selectedGPU} />;
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-9xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Select Hardware</h1>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Choose the processing unit that best suits your needs
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {['All', 'Nvidia', 'Intel', 'CPU', 'GPU'].map((item) => (
                        <button
                            key={item}
                            onClick={() => handleFilterChange(item)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === item
                                    ? 'bg-blue-600 text-white'
                                    : `${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                {item === 'Nvidia' && <SiNvidia />}
                                {item === 'Intel' && <SiAmd />}
                                <span>{item}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Cards Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {filteredHardwareData.map((hardware) => (
                                <HardwareCard
                                    key={hardware.id}
                                    hardware={hardware}
                                    isSelected={hardware.id === selectedGPUId}
                                    onSelect={handleSelectGPU}
                                    darkMode={darkMode}
                                />
                            ))}
                            <OwnComputerCard
                                isSelected={selectedGPUId === 'ownComputer'}
                                onSelect={handleSelectGPU}
                                darkMode={darkMode}
                            />
                        </div>
                    </div>

                    {/* Selection Panel */}
                    <div className="lg:w-80">
                        <SelectionPanel selectedGPU={selectedGPU} darkMode={darkMode} onContinue={handleContinue} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GPUSelectionApp;
