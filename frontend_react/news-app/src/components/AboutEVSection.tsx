// src/components/AboutEVSection.tsx
import React from 'react';

const AboutEVSection: React.FC = () => {
    return (
        <section className="py-12 px-4 md:px-16 bg-gray-100">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold text-center text-gray-800">Why Electric Vehicles?</h2>
                <p className="mt-4 text-lg text-center text-gray-600">
                    Electric vehicles (EVs) are a key technology in the fight against climate change,
                    offering a cleaner, more sustainable way to travel. EV Central brings you the latest
                    developments, insights, and trends from the EV industry.
                </p>
                <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                        <img className="w-20 h-20" src="/assets/environment-friendly.web" alt="Environment Friendly" />
                        <h3 className="mt-2 text-xl font-medium text-gray-700">Environment Friendly</h3>
                        <p className="text-gray-500">
                            EVs produce zero direct emissions, which means they are a great option for reducing your carbon footprint and helping to improve air quality.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <img className="w-20 h-20" src="/assets/cost-effective.svg" alt="Cost Effective" />
                        <h3 className="mt-2 text-xl font-medium text-gray-700">Cost Effective</h3>
                        <p className="text-gray-500">
                            The cost of running an EV is significantly lower compared to traditional vehicles, not to mention the savings from maintenance and fuel costs.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <img className="w-20 h-20" src="/assets/technology.svg" alt="Advanced Technology" />
                        <h3 className="mt-2 text-xl font-medium text-gray-700">Advanced Technology</h3>
                        <p className="text-gray-500">
                            Electric vehicles are at the forefront of automotive technological advancements, offering features and capabilities that enhance the driving experience.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutEVSection;
