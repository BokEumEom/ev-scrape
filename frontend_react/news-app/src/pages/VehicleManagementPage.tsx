// src/pages/VehicleManagementPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchVehicleSpecifications } from '@/services/vehicleService';
import { VehicleDetails } from '@/types';
import VehicleCard from '@/components/vehicle/VehicleCard';

const VehicleManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const [vehicleSpecs, setVehicleSpecs] = useState<VehicleDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favoriteVehicles, setFavoriteVehicles] = useState<VehicleDetails[]>([]);

    useEffect(() => {
        const loadVehicleSpecs = async () => {
            try {
                const data = await fetchVehicleSpecifications();
                setVehicleSpecs(data || []);
            } catch (err) {
                setError('Failed to fetch vehicle specifications.');
            } finally {
                setLoading(false);
            }
        };

        loadVehicleSpecs();
    }, []);

    const handleAddVehicle = () => {
        navigate('/vehicle-select');
    };

    const handleToggleFavorite = useCallback((vehicle: VehicleDetails) => {
        setFavoriteVehicles((prevFavorites) => {
            if (prevFavorites.includes(vehicle)) {
                return prevFavorites.filter(v => v.id !== vehicle.id);
            } else {
                return [...prevFavorites, vehicle];
            }
        });
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-bold text-center mb-6">관심 차량</h1>
            <div className="flex flex-col">
                {favoriteVehicles.map((vehicle) => (
                    <VehicleCard 
                        key={vehicle.id} 
                        vehicle={vehicle} 
                        isFavorite={true} 
                        onToggleFavorite={handleToggleFavorite} 
                    />
                ))}
                <button onClick={handleAddVehicle} className="bg-blue-500 text-white p-2 rounded-lg mt-6">
                    차량추가
                </button>
            </div>
            <h2 className="text-xl font-bold mt-10 mb-4">모든 차량</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {vehicleSpecs.map((vehicle) => (
                    <VehicleCard 
                        key={vehicle.id} 
                        vehicle={vehicle} 
                        isFavorite={favoriteVehicles.includes(vehicle)} 
                        onToggleFavorite={handleToggleFavorite} 
                    />
                ))}
            </div>
        </div>
    );
};

export default VehicleManagementPage;
