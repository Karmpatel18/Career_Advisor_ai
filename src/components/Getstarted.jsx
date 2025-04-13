import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { Code, Shield, BarChart, Server, Brain } from "lucide-react";

const GetStarted = () => {
  const navigate = useNavigate();
  
  const careerPaths = [
    { 
      title: "AI & Machine Learning", 
      icon: <Brain className="text-green-600" size={24} />,
      index: 4
    },
    { 
      title: "Cybersecurity", 
      icon: <Shield className="text-red-600" size={24} />,
      index: 2
    },
    { 
      title: "Web Development", 
      icon: <Code className="text-blue-600" size={24} />,
      index: 0
    },
    { 
      title: "Data Science", 
      icon: <BarChart className="text-purple-600" size={24} />,
      index: 1
    },
    { 
      title: "Cloud Computing", 
      icon: <Server className="text-indigo-600" size={24} />,
      index: 3
    },
    { 
      title: "DevOps", 
      icon: <Code className="text-orange-600" size={24} />,
      index: 5
    },
  ];

  const handleRoadmapClick = (index) => {
    navigate('/roadmaps', { state: { selectedIndex: index } });
  };

  const handleGetStarted = () => {
    navigate('/assessment');
  };

  return (
    <div className="flex flex-col items-center bg-neutral-50 text-neutral-900 px-6 py-10 md:px-20 space-y-16">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-48 space-y-4 pb-72 border-b border-neutral-200">
        <div className="text-3xl text-neutral-800 md:text-6xl tracking-tight font-bold">
          Empowering Your <span className="bg-gradient-to-tl from-[#c2410c] via-[#f97316] to-[#fdba74] text-transparent bg-clip-text">Career Journey</span>
        </div>
        <p className="text-neutral-400 tracking-tight max-w-2xl text-[16px] mx-auto">
          From assessments to expert guidance, we provide everything you need to
          build your dream career — all in one place.
        </p>
        <button
          onClick={handleGetStarted}
          className="flex items-center justify-center bg-neutral-900 hover:bg-neutral-700 text-white text-[18px] px-5 py-3 rounded-md transition duration-200 gap-2"
        >
          Get Started <GoArrowRight size={24} />
        </button>
      </div>
      
      <div className="flex justify-center text-4xl font-semibold tracking-tighter text-neutral-800">Career Pathways</div>
      
      {/* Grid of 6 cards - 3 columns, 2 rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
        {careerPaths.map((path, index) => (
          <div 
            key={index}
            onClick={() => handleRoadmapClick(path.index)}
            className="bg-white rounded-md p-4 hover:shadow-md transition-all duration-300 border border-neutral-200 cursor-pointer hover:scale-105"
          >
            <div className="flex items-center gap-3">
              {path.icon}
              <div className="text-lg font-medium text-neutral-800">{path.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="text-center pt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Margdarshak. All rights reserved.
      </div>
    </div>
  );
};

export default GetStarted;