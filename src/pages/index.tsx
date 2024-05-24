// pages/index.tsx

import React from "react";
import Image from "next/image";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl px-8 py-12 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Welcome to Our Website!
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
