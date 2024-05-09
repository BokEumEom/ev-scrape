// src/components/AboutEVSection.tsx
import React from 'react';
import environmentIcon from '@/assets/environment-friendly.webp';
import costIcon from '@/assets/cost-effective.webp';
import techIcon from '@/assets/technology.webp';

const AboutEVSection: React.FC = () => {
  return (
    <section id="about" className="py-12 px-4 bg-white">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Why Electric Vehicles?</h2>
        <p className="text-gray-600 mb-8">
          Electric vehicles (EVs) are at the forefront of combating climate change, offering sustainable and efficient transportation solutions.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-3 text-center">
        <div>
          <img src={environmentIcon} alt="Environment Friendly" className="w-20 h-20 mx-auto"/>
          <h3 className="my-2 text-xl">Eco-Friendly</h3>
          <p className="text-gray-600">Zero emissions contribute to a cleaner planet.</p>
        </div>
        <div>
          <img src={costIcon} alt="Cost Effective" className="w-20 h-20 mx-auto"/>
          <h3 className="my-2 text-xl">Cost-Effective</h3>
          <p className="text-gray-600">Save money on fuel and maintenance over time.</p>
        </div>
        <div>
          <img src={techIcon} alt="Advanced Technology" className="w-20 h-20 mx-auto"/>
          <h3 className="my-2 text-xl">Cutting-Edge Tech</h3>
          <p className="text-gray-600">Enjoy the latest in automotive innovations.</p>
        </div>
      </div>
    </section>
  );
};

export default AboutEVSection;
