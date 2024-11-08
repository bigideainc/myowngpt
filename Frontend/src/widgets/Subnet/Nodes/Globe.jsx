import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import ElectricityStats from "./ElectricityStats";
import cities from "./markers";

const Modal = ({ city, onClose }) => {
    if (!city) return null;

    return (
        <div
            className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-gradient-to-r from-pink-400 to-pink-500 p-3 relative">
                    <div className="flex justify-center">
                        <div className="p-3 inline-block">
                            <div className="absolute inset-0 flex items-center justify-center flex-wrap gap-1">
                                <span className="text-lg md:text-xl font-semibold text-gray-800">YOGPT</span>
                                <span className="text-lg md:text-xl font-semibold text-gray-800">-</span>
                                <span className="text-lg md:text-xl font-semibold text-gray-800">COMMUNEX</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-8">
                    <div className="grid grid-cols-1 gap-1 mb-4 md:mb-8">
                        <div className="bg-blue-50 rounded-xl p-3 md:p-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-blue-600 font-medium text-sm md:text-base">Region: {city.name}</span>
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-xl p-3 md:p-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-green-600 font-medium text-sm md:text-base">Active Subnets: {city.subnets}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={onClose}
                            className="px-6 md:px-8 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-pink-500/20 font-medium text-sm md:text-base"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const World = ({darkMode}) => {
    const globeEl = useRef();
    const [spriteMap, setSpriteMap] = useState(null);
    const [objectsData, setObjectsData] = useState([]);
    const [connectionsData, setConnectionsData] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 800,
        height: typeof window !== 'undefined' ? window.innerHeight : 600
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getGlobeDimensions = () => {
        const isMobile = dimensions.width < 768;
        const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
        
        if (isMobile) {
            return {
                width: Math.min(dimensions.width - 32, 400),
                height: 300,
                altitude: 2.5
            };
        } else if (isTablet) {
            return {
                width: Math.min(dimensions.width - 64, 500),
                height: 400,
                altitude: 2
            };
        } else {
            return {
                width: 650,
                height: 450,
                altitude: 1.5
            };
        }
    };

    useEffect(() => {
        if (globeEl.current) {
            const { altitude } = getGlobeDimensions();
            globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 1.5 });
        }
    }, [dimensions]);

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "";
        loader.load(
            "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
            (texture) => setSpriteMap(texture),
            undefined,
            (error) => console.error("An error occurred while loading the texture:", error)
        );
    }, []);

    useEffect(() => {
        if (spriteMap) {
            setObjectsData(cities);
            setConnectionsData(
                cities.map((city, index) => ({
                    startLat: city.lat,
                    startLng: city.lng,
                    endLat: cities[(index + 1) % cities.length].lat,
                    endLng: cities[(index + 1) % cities.length].lng,
                    color: darkMode ? '#FFD700' : '#342907FF', // Changed color for dark mode
                }))
            );
        }
    }, [spriteMap, darkMode]);

    useEffect(() => {
        const rotationSpeed = 0.1;
        const rotateGlobe = () => {
            if (globeEl.current) {
                const { lat, lng } = globeEl.current.pointOfView();
                globeEl.current.pointOfView({ lat, lng: lng + rotationSpeed });
            }
        };
        const interval = setInterval(rotateGlobe, 100);
        return () => clearInterval(interval);
    }, []);

    const { width, height } = getGlobeDimensions();

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-12 p-4 md:p-8 space-y-8 lg:space-y-0">
            <div className="w-full lg:w-2/3">
                <ElectricityStats darkMode={darkMode} />
            </div>
            <div className="flex-1 flex justify-center items-center min-h-[300px] md:min-h-[400px]">
                <Globe
                    ref={globeEl}
                    width={width}
                    height={height}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    backgroundImageUrl={darkMode ? "//unpkg.com/three-globe/example/img/night-sky.png" : ""}
                    backgroundColor={darkMode ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)"}
                    showAtmosphere={true}
                    objectsData={objectsData}
                    arcsData={connectionsData}
                    objectLat={(d) => d.lat}
                    objectLng={(d) => d.lng}
                    objectAltitude={0.04}
                    objectLabel={(d) => d.name}
                    objectThreeObject={(d) => {
                        const spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
                        const sprite = new THREE.Sprite(spriteMaterial);
                        const scale = dimensions.width < 768 ? 1.5 : 2.5;
                        sprite.scale.set(scale, scale, scale);
                        return sprite;
                    }}
                    arcStartLat={(d) => d.startLat}
                    arcStartLng={(d) => d.startLng}
                    arcEndLat={(d) => d.endLat}
                    arcEndLng={(d) => d.endLng}
                    arcColor={(d) => d.color}
                    arcDashLength={0.1}
                    arcDashGap={0.02}
                    arcDashInitialGap={(d) => Math.random()}
                    arcStroke={0.15}
                    arcDashAnimateTime={15000}
                    onObjectClick={(city) => {
                        setSelectedCity(city);
                        setShowModal(true);
                    }}
                />
                {showModal && (
                    <Modal
                        city={selectedCity}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default World;