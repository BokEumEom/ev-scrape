// src/components/GuidesAndResourcesSection.tsx
import React from 'react';
import { BiBattery, BiCar } from 'react-icons/bi'; // Example icons from react-icons

const GuidesAndResourcesSection: React.FC = () => {
  // Placeholder data - replace with links to your guides or resources
  const guides = [
    { id: 1, title: "The Ultimate Guide to Electric Vehicle Charging", link: "#", icon: <BiBattery className="text-3xl mb-4" />, description: "Learn all about EV charging standards, options, and what to expect as an EV owner."},
    { id: 2, title: "How to Choose the Right Electric Vehicle for You", link: "#", icon: <BiCar className="text-3xl mb-4" />, description: "Explore how to select an electric vehicle that fits your lifestyle and budget."},
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Guides & Resources</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <a key={guide.id} href={guide.link} className="block p-4 shadow-lg rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-300">
              <div className="text-center">
                {guide.icon}
                <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                <p className="text-gray-600">{guide.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidesAndResourcesSection;