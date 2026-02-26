import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-red-900 to-red-700 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-lg mb-2">
          Please give the suggestion for further improvement :
        </p>
        <p className="text-red-200">
         [Website related]: Sayani Biswas | 
         [video content related]: Rashmi Kushwah | 
         [Process related]: Anita Koranga
        </p>
      </div>
    </footer>
  );
};

export default Footer;
