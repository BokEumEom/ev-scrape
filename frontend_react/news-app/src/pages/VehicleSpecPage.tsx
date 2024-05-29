// src/pages/VehicleSpecPage.tsx
import React, { useEffect, useState } from 'react';
import { pageTransitionEffects } from '@/constants/constants';
import { motion } from 'framer-motion';
import Dropdown from '@/components/ui/Dropdown';
import VehicleSpec from '@/components/vehicle/VehicleSpec';
import { fetchVehicleSpecifications } from '@/services/vehicleService';
import { VehicleDetails } from '@/types';

const VehicleSpecPage: React.FC = () => {
    const [carData, setCarData] = useState<VehicleDetails[]>([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState('');
    const [filteredData, setFilteredData] = useState<VehicleDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetchVehicleSpecifications().then(data => {
            setCarData(data);
            setIsLoading(false);
        }).catch(err => {
            console.error('Fetch error:', err.message);
            setError(err.message);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        if (selectedManufacturer) {
            const filtered = carData.filter(car =>
                car.manufacturer.toLowerCase() === selectedManufacturer.toLowerCase()
            );
            setFilteredData(filtered);
        } else {
            setFilteredData([]);
        }
    }, [selectedManufacturer, carData]);

    const uniqueManufacturers = Array.from(new Set(carData.map(car => car.manufacturer)));

    return (
        <motion.div
        initial="initial" // 초기 애니메이션 상태
        animate="animate" // 이 상태로 애니메이션
        exit="exit" // 종료 애니메이션 상태
        variants={pageTransitionEffects} // 전환 변형
        className="flex flex-col pt-16 pb-20" // 주요 컨테이너 스타일링
        >
            <div className="container mx-auto p-4 py-16 tracking-tighter">
                <h1 className="mt-6 text-xl my-4 font-bold">궁금했던 전기차의<br />제원을 확인해볼까요?</h1>
                <Dropdown
                    options={uniqueManufacturers}
                    selected={selectedManufacturer}
                    onSelect={setSelectedManufacturer}
                />
                <p className="font-mono text-right mt-4">Total : {filteredData.length}</p>
                {isLoading && <p>Loading data...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {filteredData.length === 0 && selectedManufacturer && (
                    <p className="flex items-center text-red-500 mt-2">검색된 차량이 없습니다.</p>
                )}
                {filteredData.map(car => (
                    <VehicleSpec key={car.id} specs={car} />
                ))}
            </div>
        </motion.div>
    );
};

export default VehicleSpecPage;