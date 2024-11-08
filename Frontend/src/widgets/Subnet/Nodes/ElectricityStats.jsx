import { Check, Cloud, HardDrive, Server, Zap } from "lucide-react";
import React from 'react';

const ComputeOptions = ({ darkMode }) => {
    const providers = [
        { 
            name: 'NVIDIA Cloud', 
            subnet: 'A100 Subnet',
            availability: '99.9%',
            icon: HardDrive,
            specs: 'Up to 80GB VRAM'
        },
        { 
            name: 'AMD Instinct', 
            subnet: 'MI250 Network',
            availability: '99.7%',
            icon: Server,
            specs: 'Up to 128GB VRAM'
        },
        { 
            name: 'Google Cloud GPU', 
            subnet: 'TPU Subnet',
            availability: '99.8%',
            icon: Cloud,
            specs: 'Custom TPU architecture'
        },
        { 
            name: 'AWS GPU Cloud', 
            subnet: 'P4d Subnet',
            availability: '99.9%',
            icon: Zap,
            specs: 'Elastic GPU scaling'
        }
    ];

    const bgColor = darkMode ? 'bg-gray-900' : 'bg-white';
    const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
    const subTextColor = darkMode ? 'text-gray-300' : 'text-gray-600';
    const cardBg = darkMode ? 'bg-gray-800' : 'bg-gray-50';
    const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

    return (
        <div className={`p-6 ${bgColor} rounded-lg shadow-lg`}>
            <h2 className="text-lg font-semibold mb-4 text-blue-500 leading-snug">
                Powering YOGPT-Commune Subnet Operations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {providers.map((provider) => (
                    <div 
                        key={provider.name} 
                        className={`${cardBg} p-4 rounded-lg border ${borderColor} transition-transform hover:scale-105 transform hover:shadow-md`}
                    >
                        <div className="flex items-center mb-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full">
                                <provider.icon size={20} className="text-white" />
                            </div>
                            <div className="ml-3">
                                <h3 className={`text-sm font-medium ${textColor}`}>{provider.name}</h3>
                                <p className={`text-xs ${subTextColor}`}>{provider.subnet}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs ${subTextColor}`}>
                                Availability: {provider.availability}
                            </span>
                            <span className={`text-xs ${subTextColor}`}>
                                {provider.specs}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`${cardBg} p-4 rounded-lg border ${borderColor}`}>
                <div className={`text-lg font-bold ${textColor} tracking-tight`}>
                    4.2M<span className="text-blue-500">+</span>
                </div>
                <p className={`text-sm ${subTextColor} mt-1`}>
                    GPU cores worldwide supporting YOGPT-Commune&apos;s Miner and Validator Subnets
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                    {['24/7 Accessibility', 'Global Reach', 'Auto-scaling', 'Load Balancing'].map((feature) => (
                        <div key={feature} className="flex items-center">
                            <Check size={14} className="text-blue-500 mr-1" />
                            <span className={`text-xs ${subTextColor}`}>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComputeOptions;
