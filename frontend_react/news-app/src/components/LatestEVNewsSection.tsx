// src/components/LatestEVNewsSection.tsx
import React from 'react';

const LatestEVNewsSection: React.FC = () => {
  // Placeholder data - replace with real data fetching logic
  const news = [
    { id: 1, title: "EV Sales Skyrocket in 2023", summary: "A comprehensive look at the factors driving the surge in electric vehicle sales." },
    { id: 2, title: "New Battery Tech Promises Longer Ranges", summary: "Innovations in battery technology may soon extend EV ranges significantly." },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Latest EV News</h2>
        {news.map((item) => (
          <div key={item.id} className="mb-6 p-4 shadow-lg rounded-lg bg-white">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p>{item.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestEVNewsSection;
