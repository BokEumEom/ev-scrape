// src/components/LatestEVNewsSection.tsx
import React from 'react';

const LatestEVNewsSection: React.FC = () => {
  const news = [
    {
      id: 1,
      title: "EV Sales Skyrocket in 2023",
      summary: "A comprehensive look at the factors driving the surge in electric vehicle sales.",
      imageUrl: "https://ev-volumes.com/wp-content/uploads/sites/19/2024/02/WW-C2-12-2023.jpg" // Make sure this URL is valid
    },
    {
      id: 2,
      title: "New Battery Tech Promises Longer Ranges",
      summary: "Innovations in battery technology may soon extend EV ranges significantly.",
      imageUrl: "https://img.theweek.in/content/dam/week/news/2020/images/2022/2/10/EV-electric-car-charge-battery-energy--Automobile-charging-shut.jpg" // Make sure this URL is valid
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Latest EV News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {news.map((item) => (
            <div key={item.id} className="bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestEVNewsSection;