import React, { useState } from 'react';
import { FaMapMarkerAlt, FaMemory, FaMicrochip } from 'react-icons/fa';
import { SiAmd, SiNvidia } from 'react-icons/si';
import ChipSelection from './ConnectivitySelection';
import OwnComputerCard from './Nodes/UseOwnComputerCard';

const gpuData = [
    { id: 1, name: 'NVIDIA A4000 x2', memory: '16GB', details: 'Intel Xeon W-2123 @ 3.60GHz, 256G RAM, 2T NVME', type: 'GPU', brand: 'Nvidia', costPerHour: '0.8', location: 'Alchemy', description: 'T5820' },
    { id: 2, name: 'HP DL360 G9', memory: 'No GPU', details: 'Intel Xeon E5-2680 v4 @ 2.40GHz, 128G RAM, 1.8T NVME', type: 'CPU', brand: 'Intel', costPerHour: '0.35', location: 'Alchemy', description: 'Server' },
    { id: 3, name: 'HP DL360 G9', memory: 'No GPU', details: 'Intel Xeon E5-2680 v4 @ 2.40GHz, 128G RAM, 1.8T NVME', type: 'CPU', brand: 'Intel', costPerHour: '0.35', location: 'Alchemy', description: 'Server' },
    { id: 4, name: 'NVIDIA A4000 x2', memory: '16GB', details: 'Intel Xeon W-2125 @ 4.00GHz, 48G RAM, 2T NVME', type: 'GPU', brand: 'Nvidia', costPerHour: '0.5', location: 'Alchemy', description: 'T5820' },
];

const HardwareCard = ({ hardware, isSelected, onSelect, darkMode }) => {
  const isGPU = hardware.type === 'GPU';
  
  return (
    <div
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer
        ${isSelected 
          ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20' 
          : `shadow-md ${darkMode ? 'shadow-gray-900/30' : 'shadow-gray-200/50'}`
        }
        ${darkMode ? 'bg-gray-800' : 'bg-white'}
      `}
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

        {/* Details Section */}
        <div className="mt-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Specifications</p>
          <p className="text-sm mt-1 leading-relaxed">{hardware.details}</p>
        </div>

        {/* Description Badge */}
        <div className="flex items-center justify-between mt-2">
          <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            {hardware.description}
          </span>
          <input
            type="radio"
            checked={isSelected}
            onChange={() => onSelect(hardware.id)}
            className="w-4 h-4 text-blue-600"
          />
        </div>
      </div>
    </div>
  );
};
const SelectionPanel = ({ selectedGPU, darkMode, onContinue }) => {
  return (
    <div className={`
      rounded-xl p-6 h-fit sticky top-4
      ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
      shadow-xl ${darkMode ? 'shadow-gray-900/30' : 'shadow-gray-200/50'}
    `}>
      <h2 className="text-xl font-bold mb-4">Selected Hardware</h2>
      
      {!selectedGPU && (
        <div className="text-center py-8">
          <FaMicrochip className={`text-4xl mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No hardware selected
          </p>
        </div>
      )}

      {selectedGPU === 'ownComputer' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900">
            <h3 className="font-medium text-purple-900 dark:text-purple-300">Using Personal Computer</h3>
            <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
              Ensure your system meets the minimum requirements
            </p>
          </div>
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
                  {selectedGPU.description}
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <p className="text-sm">{selectedGPU.details}</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onContinue}
        className={`
          w-full mt-6 py-2 px-4 rounded-lg font-medium transition-colors
          ${selectedGPU
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : `${darkMode ? 'bg-gray-700' : 'bg-gray-100'} cursor-not-allowed`
          }
        `}
        disabled={!selectedGPU}
      >
        Continue
      </button>
    </div>
  );
};

const GPUSelectionApp = ({ darkMode }) => {
  const [selectedGPUId, setSelectedGPUId] = useState(null);
  const [filter, setFilter] = useState('All');
  const [isConnectivityScreen, setIsConnectivityScreen] = useState(false);

  const handleSelectGPU = (id) => setSelectedGPUId(id);
  const handleFilterChange = (newFilter) => setFilter(newFilter);
  const handleContinue = () => setIsConnectivityScreen(true);

  const selectedGPU = selectedGPUId === 'ownComputer' 
    ? 'ownComputer' 
    : gpuData.find((gpu) => gpu.id === selectedGPUId);
    
  const filteredGpuData = gpuData.filter(
    gpu => filter === 'All' || gpu.type === filter || gpu.brand === filter
  );

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
              className={`
                px-4 py-2 rounded-lg font-medium transition-colors
                ${filter === item 
                  ? 'bg-blue-600 text-white' 
                  : `${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} 
                     hover:bg-gray-100 dark:hover:bg-gray-700`
                }
              `}
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
              {filteredGpuData.map((gpu) => (
                <HardwareCard
                  key={gpu.id}
                  hardware={gpu}
                  isSelected={gpu.id === selectedGPUId}
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
            <SelectionPanel
              selectedGPU={selectedGPU}
              darkMode={darkMode}
              onContinue={handleContinue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPUSelectionApp;