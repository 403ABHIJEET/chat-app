'use client';
import React, { useState } from 'react';
import './FlipCard.css';
import SignUp from './SignUp';
import Login from './Login';

const FlipCard: React.FC = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-card perspective mx-auto">
      <div
        className={`flip-inner relative w-full h-full transition-transform duration-500 ${flipped ? 'flipped' : ''}`}
      >
        {/* Front */}
        <div
          className={`flip-front absolute w-full h-full bg-white dark:bg-zinc-900 text-black dark:text-white rounded-xl shadow-xl flex flex-col items-center justify-center p-4 space-y-4 transition-opacity duration-500 ${flipped ? 'opacity-0 pointer-events-none z-0' : 'opacity-100 z-10'
            }`}
        >
          <Login flips={(val) => setFlipped(val)} />
        </div>

        {/* Back */}
        <div
          className={`flip-back absolute w-full h-full bg-white dark:bg-zinc-900 text-black dark:text-white rounded-xl shadow-xl flex flex-col items-center justify-center p-4 space-y-4 transition-opacity duration-500 ${flipped ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
            }`}
        >
          <SignUp flips={(val) => setFlipped(val)} />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
