// src/components/GuidesAndResourcesSection.tsx
import React from 'react';

const GuidesAndResourcesSection: React.FC = () => {
  // Placeholder data - replace with links to your guides or resources
  const guides = [
    { id: 1, title: "The Ultimate Guide to Electric Vehicle Charging", link: "#" },
    { id: 2, title: "How to Choose the Right Electric Vehicle for You", link: "#" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Guides & Resources</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <a key={guide.id} href={guide.link} className="block p-4 shadow-lg rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-300">
              <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidesAndResourcesSection;
