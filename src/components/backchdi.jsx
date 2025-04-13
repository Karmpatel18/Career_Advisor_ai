import React, { useState } from "react";
import { Check, Info } from "lucide-react";

const BackendRoadmap = () => {
  const [completedNodes, setCompletedNodes] = useState(new Set([
    "javascript", "go", "python", "ruby", "java", "c-sharp", "php", "rust", 
    "github", "gitlab", "mysql", "mariadb", "mssql", "internet", "http", 
    "domain", "hosting", "dns", "browsers", "git", "postgresql"
  ]));

  const toggleNodeCompletion = (id) => {
    const newCompleted = new Set(completedNodes);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedNodes(newCompleted);
  };

  // Component for a roadmap node
  const RoadmapNode = ({ id, title, highlight, isYellow, size = "normal", children, connections = [] }) => {
    const isCompleted = completedNodes.has(id);
    
    // Determine the appropriate color classes
    let bgColor = isYellow ? "bg-yellow-300" : "bg-amber-200";
    let borderColor = isYellow ? "border-yellow-400" : "border-amber-300";
    
    if (highlight === "purple") {
      bgColor = isCompleted ? "bg-purple-100" : "bg-white";
      borderColor = "border-purple-500";
    } else if (highlight === "green") {
      bgColor = isCompleted ? "bg-green-100" : "bg-white";
      borderColor = "border-green-500";
    }
    
    // Size classes
    const sizeClasses = {
      small: "px-4 py-1.5 text-sm",
      normal: "px-6 py-2",
      large: "px-8 py-3 text-lg"
    };
    
    return (
      <div className="relative">
        <button 
          onClick={() => toggleNodeCompletion(id)}
          className={`${bgColor} ${borderColor} border rounded-md ${sizeClasses[size]} font-medium flex items-center justify-between gap-2 hover:shadow-md transition-shadow duration-200`}
        >
          {title}
          {isCompleted && (
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${highlight === "purple" ? "bg-purple-500" : highlight === "green" ? "bg-green-500" : "bg-gray-500"}`}>
              <Check size={14} className="text-white" />
            </div>
          )}
        </button>
        {children}
      </div>
    );
  };

  return (
    <div className="p-8 min-h-screen bg-white">
      {/* Header section with legend */}
      <div className="mb-10 flex justify-between">
        <div className="border border-gray-900 rounded-lg p-4 w-96">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <Check size={14} className="text-white" />
            </div>
            <span className="text-sm">Personal Recommendation / Opinion</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <Check size={14} className="text-white" />
            </div>
            <span className="text-sm">Alternative Option / Pick this or purple</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
              <Check size={14} className="text-white" />
            </div>
            <span className="text-sm">Order not strict / Learn anytime</span>
          </div>
        </div>

        <div className="border border-gray-900 rounded-lg p-4 w-96">
          <p className="mb-4 text-sm">Find the detailed version of this roadmap along with other similar roadmaps</p>
          <a 
            href="https://roadmap.sh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            roadmap.sh
          </a>
        </div>
      </div>

      {/* Beginner Friendly Version Button */}
      <div className="mb-10">
        <button className="bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors">
          Visit Beginner Friendly Version
        </button>
      </div>

      {/* Main roadmap content */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-5xl">
          {/* Title */}
          <div className="text-3xl font-bold text-center mb-10">Backend</div>

          {/* Core diagram */}
          <div className="relative">
            {/* Central nodes */}
            <div className="flex flex-col items-center">
              <div className="relative mb-16">
                <RoadmapNode id="internet" title="Internet" isYellow={true} size="normal" />
                {/* Dotted lines to Internet nodes */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-16 border-l-2 border-blue-500"></div>
              </div>

              <div className="relative mb-16">
                <RoadmapNode id="pick-language" title="Pick a Language" isYellow={true} size="normal" />
                {/* Dotted lines to Version Control */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-16 border-l-2 border-blue-500"></div>
              </div>

              <div className="relative mb-16">
                <RoadmapNode id="version-control" title="Version Control Systems" isYellow={true} size="normal" />
              </div>
            </div>

            {/* Language options */}
            <div className="absolute top-16 left-0 grid grid-cols-2 gap-2 w-64">
              <RoadmapNode id="javascript" title="JavaScript" highlight="purple" />
              <RoadmapNode id="go" title="Go" highlight="purple" />
              <RoadmapNode id="python" title="Python" highlight="green" />
              <RoadmapNode id="ruby" title="Ruby" highlight="green" />
              <RoadmapNode id="java" title="Java" highlight="green" />
              <RoadmapNode id="c-sharp" title="C#" highlight="green" />
              <RoadmapNode id="php" title="PHP" highlight="green" />
              <RoadmapNode id="rust" title="Rust" highlight="green" />
            </div>

            {/* Connect Pick a Language to languages */}
            <div className="absolute top-32 left-72 w-32 h-0.5 border-t-2 border-blue-500 border-dotted"></div>

            {/* Git & Version Control */}
            <div className="absolute top-80 left-1/2 transform -translate-x-1/2 mt-6">
              <RoadmapNode id="git" title="Git" highlight="purple" />
            </div>
            <div className="absolute top-72 left-1/2 transform -translate-x-1/2 h-10 w-0.5 border-l-2 border-dotted border-blue-500"></div>

            {/* Repository Hosting Services */}
            <div className="absolute top-72 left-44 flex flex-col gap-2">
              <RoadmapNode id="github" title="GitHub" highlight="purple" />
              <RoadmapNode id="gitlab" title="GitLab" highlight="green" />
            </div>
            <div className="absolute top-120 left-180 w-40 h-60 border-l-2 border-t-2 border-dotted border-blue-500"></div>

            {/* Internet topics */}
            <div className="absolute top-0 right-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="internet-works" title="How does the internet work?" highlight="purple" />
              <RoadmapNode id="http" title="What is HTTP?" highlight="purple" />
              <RoadmapNode id="domain" title="What is Domain Name?" highlight="purple" />
              <RoadmapNode id="hosting" title="What is hosting?" highlight="purple" />
              <RoadmapNode id="dns" title="DNS and how it works?" highlight="purple" />
              <RoadmapNode id="browsers" title="Browsers and how they work?" highlight="purple" />
            </div>
            
            {/* Connect Internet to its topics */}
            <div className="absolute top-8 left-1/2 transform translate-x-20 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>
            <div className="absolute top-32 right-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Database section */}
            <div className="absolute top-80 right-44 flex flex-col gap-2">
              <RoadmapNode id="mysql" title="MySQL" highlight="green" />
              <RoadmapNode id="mariadb" title="MariaDB" highlight="green" />
              <RoadmapNode id="mssql" title="MS SQL" highlight="green" />
            </div>

            {/* PostgreSQL */}
            <div className="absolute top-80 left-1/2 transform translate-x-32 mt-32">
              <RoadmapNode id="postgresql" title="PostgreSQL" highlight="purple" />
            </div>

            {/* Tooltip */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-2 opacity-80">
              <span className="font-bold text-yellow-400">TIP</span>
              <span>Right-click a topic to mark it as done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendRoadmap;