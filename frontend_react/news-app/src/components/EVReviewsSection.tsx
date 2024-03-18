// src/components/EVReviewsSection.tsx
import React from 'react';

const EVReviewsSection: React.FC = () => {
  // Placeholder data - replace with real data fetching logic
  const reviews = [
    { id: 1, model: "Tesla Model 3", review: "The Tesla Model 3 is an all-around fantastic electric vehicle." },
    { id: 2, model: "Chevrolet Bolt", review: "The Bolt offers great range and value for the price." },
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">EV Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className="mb-6 p-4 shadow-lg rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">{review.model}</h3>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EVReviewsSection;
