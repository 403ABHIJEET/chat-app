'use client';

import React, { useState } from 'react';
import './FlipCard.css';

const FlipCard: React.FC = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-card w-80 h-52 perspective">
      <div
        className={`flip-inner relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="flip-front absolute w-full h-full bg-white rounded-xl shadow-xl backface-hidden flex flex-col items-center justify-center p-4 space-y-4">
          <h2 className="text-xl font-bold">Front Side</h2>
          <button
            onClick={() => setFlipped(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Show Back
          </button>
        </div>

        {/* Back */}
        <div className="flip-back absolute w-full h-full bg-blue-600 text-white rounded-xl shadow-xl rotate-y-180 backface-hidden flex flex-col items-center justify-center p-4 space-y-4">
          <h2 className="text-xl font-bold">Back Side</h2>
          <button
            onClick={() => setFlipped(false)}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Show Front
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
