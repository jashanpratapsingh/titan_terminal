import React from 'react';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-titan-background">
      <div className="text-center px-4">
        <h1 className="text-titan-white text-4xl md:text-6xl font-extrabold mb-4 tracking-wide">
          EXPERIENCE<br />OUTPERFORMANCE
        </h1>
        <p className="text-titan-white text-lg md:text-2xl mb-8 font-medium opacity-80">
          WITH TITAN&apos;S META DEX AGGREGATOR
        </p>
        <button className="bg-titan-orange text-titan-white font-bold py-3 px-8 rounded-md text-lg shadow-lg hover:bg-titan-yellow transition">
          JOIN WAITLIST
        </button>
      </div>
    </div>
  );
};

export default Index;
