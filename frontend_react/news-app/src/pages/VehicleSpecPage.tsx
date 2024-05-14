import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import CarSpecCard from '../components/vehicle/VehicleSpec';

interface CarDetails {
  id: number;
  manufacturer: string;
  model: string;
  drive_type: string;
  battery_type: string;
  battery_capacity: number;
  range_km: number;
  acceleration: number;
  weight_kg: number;
  storage_l: number;
  wheel_size: string;
  seating_capacity: number;
  display_inch: number;
  minimum_ground_clearance_mm: number;
  width_mm: number;
  height_mm: number;
  length_mm: number;
}

const CarSpecPage: React.FC = () => {
    const [carData, setCarData] = useState<CarDetails[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState<CarDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://fastapi.watercharging.com/api/v1/vehicles/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setCarData(data);
            setIsLoading(false);
        })
        .catch(err => {
            console.error('Fetch error:', err);
            setError(err.message);
            setIsLoading(false);
        });
    }, []);

    const debouncedSearch = debounce((query) => {
      if (query.trim()) {
          const queryLower = query.toLowerCase().replace(/\s+/g, ' ').trim();  // Replace multiple spaces with a single space and trim
          const filtered = carData.filter(car =>
              car.manufacturer.toLowerCase().includes(queryLower) || 
              car.model.toLowerCase().includes(queryLower)
          );
          setFilteredData(filtered);
      } else {
          setFilteredData([]);
      }
  }, 300);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event.target.value);
    };

    return (
        <div className="container mx-auto p-4 tracking-tighter bg-slate-50 h-screen">
            <h1 className="mt-16 text-xl my-4 font-bold">궁금했던 전기차의<br/>제원을 검색해볼까요?</h1>
            <input 
                type="text" 
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="차량 모델 또는 제조사를 입력해주세요"
                className="px-4 mt-2 w-full h-12 border-solid border border-indigo-600 focus:border-indigo-600 focus:ring-0 rounded-sm"
            />
             <p className="font-mono text-right mt-4">Total : {filteredData.length}</p>
            {isLoading && <p>Loading data...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {filteredData.length === 0 && searchTerm && (
                <p className="flex items-center text-red-500 mt-2">검색된 차량이 없습니다.</p>
            )}
            {filteredData.map(car => (
                <CarSpecCard key={car.id} specs={car} />
            ))}
        </div>
    );
};

export default CarSpecPage;
