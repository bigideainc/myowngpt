import React, { useEffect, useState } from 'react';
import { FaApple, FaDesktop } from 'react-icons/fa';
import { SiAmd, SiNvidia } from 'react-icons/si';
import ChipSelection from './ConnectivitySelection';

const gpuData = [
    { id: 1, name: 'NVIDIA GeForce RTX 3090', memory: '24GB', usage: 70, type: 'GPU', brand: 'Nvidia', costPerHour: 0.5 },
    { id: 2, name: 'NVIDIA GeForce RTX 3090', memory: '12GB', usage: 40, type: 'GPU', brand: 'Nvidia', costPerHour: 0.4 },
    { id: 3, name: 'NVIDIA GeForce RTX 3060', memory: '12GB', usage: 80, type: 'GPU', brand: 'Nvidia', costPerHour: 0.3 },
    { id: 4, name: 'NVIDIA RTX A6000', memory: '24GB', usage: 50, type: 'GPU', brand: 'Nvidia', costPerHour: 0.7 },
    { id: 5, name: 'QUADRO RTX 8000', memory: '48GB', usage: 10, type: 'GPU', brand: 'Nvidia', costPerHour: 0.9 },
    { id: 6, name: 'Apple M1', memory: '16GB', usage: 30, type: 'CPU', brand: 'Apple', costPerHour: 0.2 },
    { id: 7, name: 'AMD EPYC 7763', memory: '32GB', usage: 60, type: 'CPU', brand: 'AMD', costPerHour: 0.25 },
    { id: 8, name: 'Google TPU v4', memory: '32GB', usage: 20, type: 'TPU', brand: 'TPU', costPerHour: 0.35 },
];

const OwnComputerCard = ({ isSelected, onSelect, darkMode }) => {
    return (
      <div
        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
          isSelected
            ? `bg-gradient-to-r from-[#6e8efb] to-[#a777e3] text-white`
            : `${darkMode ? 'border-gray-700' : 'border-gray-300'} bg-gradient-to-r from-[#6e8efb] to-[#a777e3] text-white`
        }`}
        onClick={() => onSelect('ownComputer')}
        style={{ height: '150px' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaDesktop size={32} className="mr-2" />
            <h3 className="font-semibold">Use Your Own Computer</h3>
          </div>
          <div className="mt-2 flex justify-end">
            <input
              type="radio"
              checked={isSelected}
              onChange={() => onSelect('ownComputer')}
              className="form-radio text-white"
            />
          </div>
        </div>
        <p className="mt-4 text-sm">
          Connect and utilize your personal computing resources.
        </p>
      </div>
    );
  };
  
const GPUCard = ({ gpu, isSelected, onSelect, darkMode }) => {
    const segments = 10;
    const busySegments = Math.round((gpu.usage / 100) * segments);
    const freeSegments = segments - busySegments;

    return (
        <div
            className={`border rounded-lg p-4 cursor-pointer ${isSelected ? 'border-blue-500' : `${darkMode ? 'border-gray-700' : 'border-gray-300'}`} 
      ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => onSelect(gpu.id)}
            style={{ height: '150px' }}
        >
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{gpu.name}</h3>
                <p className="text-sm">{gpu.memory}</p>
            </div>
            <div className="mt-2 text-xs">
                <span>{gpu.usage}% Busy / {100 - gpu.usage}% Free</span>
            </div>
            <div className="flex mt-1">
                {[...Array(busySegments)].map((_, i) => (
                    <div key={`busy-${i}`} className="w-4 h-2 bg-black mr-0.5 rounded-sm"></div>
                ))}
                {[...Array(freeSegments)].map((_, i) => (
                    <div key={`free-${i}`} className={`w-4 h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} mr-0.5 rounded-sm`}></div>
                ))}
            </div>
            <div className="mt-2 flex justify-end">
                <input type="radio" checked={isSelected} onChange={() => onSelect(gpu.id)} className="form-radio text-blue-500" />
            </div>
        </div>
    );
}

const GPUSelectionApp = ({ darkMode }) => {
    const [selectedGPUId, setSelectedGPUId] = useState(null);
    const [filter, setFilter] = useState('All');
    const [isConnectivityScreen, setIsConnectivityScreen] = useState(false);

    const handleSelectGPU = (id) => setSelectedGPUId(id);

    const handleFilterChange = (newFilter) => setFilter(newFilter);

    const handleContinue = () => setIsConnectivityScreen(true);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && selectedGPUId) {
            handleContinue();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedGPUId]);

    const selectedGPU = gpuData.find((gpu) => gpu.id === selectedGPUId);
    const filteredGpuData = gpuData.filter((gpu) => {
        if (filter === 'All') return true;
        if (filter === 'GPU' || filter === 'CPU' || filter === 'TPU') return gpu.type === filter;
        return gpu.brand === filter;
    });

    return isConnectivityScreen ? (
        <ChipSelection darkMode={darkMode} selectedGPU={selectedGPU} />
    ) : (
        <div className={`flex flex-col gap-6 p-4 sm:p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {/* Header Section */}
            <div className="text-center mb-4">
                <h2 className="text-2xl font-semibold">Select Processor Chip</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} mt-2`}>
                    Browse from a wide range of chips suitable for different use cases. You can either select a CPU-only chip or a GPU-only chip.
                </p>
            </div>

            {/* Filter Buttons Row */}
            <div className="flex flex-wrap gap-2 justify-center">
                {['Apple', 'Nvidia', 'AMD', 'GPU', 'CPU', 'TPU'].map((item) => (
                    <button
                        key={item}
                        onClick={() => handleFilterChange(item)}
                        className={`px-3 py-1 rounded ${filter === item ? 'bg-blue-500 text-white' : `${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200'}`}`}
                    >
                        {item === 'Apple' ? <FaApple /> : item === 'Nvidia' ? <SiNvidia /> : item === 'AMD' ? <SiAmd /> : item}
                    </button>
                ))}
            </div>

            {/* Main Content Row with GPU Cards and Summary */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* GPU Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                    {filteredGpuData.map((gpu) => (
                        <GPUCard key={gpu.id} gpu={gpu} isSelected={gpu.id === selectedGPUId} onSelect={handleSelectGPU} darkMode={darkMode} />
                    ))}
                    {/* Own Computer Card */}
                    <OwnComputerCard isSelected={selectedGPUId === 'ownComputer'} onSelect={handleSelectGPU} darkMode={darkMode} />
                </div>

                {/* Summary Section */}
                <div className="w-full md:w-1/3">
                    <div className={`border rounded-lg p-4 shadow-md ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'}`}>
                        <h2 className="text-xl font-semibold">Selected Option</h2>
                        {selectedGPUId === 'ownComputer' ? (
                            <>
                                <p className="mt-4 text-sm">You have selected to use your own computer. Ensure connectivity and compatibility with the application.</p>
                                <button onClick={handleContinue} className={`mt-4 px-4 py-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-black text-white'}`}>Continue</button>
                            </>
                        ) : selectedGPU ? (
                            <>
                                <ul className="mt-4 space-y-2 text-sm">
                                    <li><strong>Name:</strong> {selectedGPU.name}</li>
                                    <li><strong>Memory:</strong> {selectedGPU.memory}</li>
                                    <li><strong>Usage:</strong> {selectedGPU.usage}% Busy / {100 - selectedGPU.usage}% Free</li>
                                    <li><strong>Type:</strong> {selectedGPU.type}</li>
                                    <li><strong>Brand:</strong> {selectedGPU.brand}</li>
                                </ul>
                                <div className="mt-4 flex items-center space-x-2">
                                    <button onClick={handleContinue} className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-black text-white'}`}>Continue</button>
                                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>press <strong>Enter</strong> ↵</span>
                                </div>
                            </>
                        ) : (
                            <p className="mt-4 text-sm text-gray-500">No GPU selected.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GPUSelectionApp;
