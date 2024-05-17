// src/components/HeroSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
    return (
        <div className="bg-white text-gray-800 text-center p-12 pt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
            <h1 className="text-4xl font-bold">Welcome to EV Trend</h1>
            <p className="mt-4 text-xl">Your ultimate guide to the electric vehicle revolution.</p>
            <Link to="/news" className="mt-8 inline-block bg-indigo-500 text-white py-2 px-6 rounded hover:bg-yellow-400 transition duration-300">
                Get Started
            </Link>
        </div>
    );
}

export default HeroSection;
