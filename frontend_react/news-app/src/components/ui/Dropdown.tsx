// src/components/ui/Dropdown.tsx
import React, { useState, useEffect, useRef } from 'react';
import { DropdownProps } from '../../types';


const Dropdown: React.FC<DropdownProps> = ({ options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleSelect = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={handleToggle}
                className="flex items-center justify-between w-full px-4 py-4 mt-2 text-base leading-tight border border-indigo-600 rounded-sm focus:border-indigo-600 focus:outline-none focus:ring-0"
            >
                <span>{selected || '차량 제조사를 선택해주세요'}</span>
                <svg
                    className={`w-4 h-4 ml-2 text-gray-600 transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <ul className="absolute z-10 w-full bg-white border border-indigo-600 rounded-sm shadow-lg mt-1 ">
                    {options.map(option => (
                        <li key={option}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSelect(option);
                                }}
                                className="block px-4 py-4 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white truncate"
                            >
                                {option}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;