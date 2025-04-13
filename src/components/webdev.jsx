import React, { useState } from "react";
import { Check, Info } from "lucide-react";

const WebDevRoadmap = () => {
  const [completedNodes, setCompletedNodes] = useState(new Set([
    "html", "css", "javascript", "git", "github", "responsive", "accessibility",
    "dom", "fetch", "npm", "sass", "chrome-devtools"
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
  const RoadmapNode = ({ id, title, highlight, isYellow, size = "normal", children }) => {
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
          <div className="text-3xl font-bold text-center mb-10">Web Development</div>

          {/* Core diagram */}
          <div className="relative">
            {/* Central nodes */}
            <div className="flex flex-col items-center gap-16">
              <RoadmapNode id="internet-basics" title="Internet Basics" isYellow={true} size="normal" />
              <RoadmapNode id="html-css-js" title="HTML, CSS & JavaScript" isYellow={true} size="normal" />
              <RoadmapNode id="frontend-backend" title="Choose Your Path" isYellow={true} size="normal" />
              <RoadmapNode id="frameworks" title="Frameworks & Libraries" isYellow={true} size="normal" />
              <RoadmapNode id="advanced-concepts" title="Advanced Concepts" isYellow={true} size="normal" />
            </div>

            {/* Internet Basics */}
            <div className="absolute top-0 right-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="how-internet-works" title="How the Internet Works" highlight="purple" />
              <RoadmapNode id="dns" title="DNS & Domain Names" highlight="purple" />
              <RoadmapNode id="hosting" title="Web Hosting" highlight="purple" />
              <RoadmapNode id="browsers" title="How Browsers Work" highlight="purple" />
              <RoadmapNode id="http" title="HTTP Protocol" highlight="purple" />
            </div>
            <div className="absolute top-8 left-1/2 transform translate-x-20 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* HTML CSS JS */}
            <div className="absolute top-24 left-0 grid grid-cols-1 gap-2 w-72">
              <RoadmapNode id="html" title="HTML5" highlight="purple" />
              <RoadmapNode id="css" title="CSS3" highlight="purple" />
              <RoadmapNode id="javascript" title="JavaScript" highlight="purple" />
              <RoadmapNode id="dom" title="DOM Manipulation" highlight="purple" />
              <RoadmapNode id="responsive" title="Responsive Design" highlight="purple" />
              <RoadmapNode id="accessibility" title="Web Accessibility" highlight="purple" />
            </div>
            <div className="absolute top-32 left-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Version Control */}
            <div className="absolute top-24 right-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="git" title="Git" highlight="purple" />
              <RoadmapNode id="github" title="GitHub" highlight="purple" />
              <RoadmapNode id="gitlab" title="GitLab" highlight="green" />
            </div>
            <div className="absolute top-32 right-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Frontend Path */}
            <div className="absolute top-64 left-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="frontend-title" title="Frontend Path" isYellow={true} />
              <RoadmapNode id="react" title="React" highlight="purple" />
              <RoadmapNode id="vue" title="Vue.js" highlight="green" />
              <RoadmapNode id="angular" title="Angular" highlight="green" />
              <RoadmapNode id="svelte" title="Svelte" highlight="green" />
              <RoadmapNode id="typescript" title="TypeScript" highlight="purple" />
              <RoadmapNode id="sass" title="Sass/SCSS" highlight="purple" />
              <RoadmapNode id="tailwind" title="Tailwind CSS" highlight="purple" />
            </div>
            <div className="absolute top-72 left-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Backend Path */}
            <div className="absolute top-64 right-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="backend-title" title="Backend Path" isYellow={true} />
              <RoadmapNode id="nodejs" title="Node.js" highlight="purple" />
              <RoadmapNode id="express" title="Express.js" highlight="purple" />
              <RoadmapNode id="python" title="Python" highlight="green" />
              <RoadmapNode id="django" title="Django" highlight="green" />
              <RoadmapNode id="php" title="PHP" highlight="green" />
              <RoadmapNode id="laravel" title="Laravel" highlight="green" />
              <RoadmapNode id="databases" title="Databases" highlight="purple" />
            </div>
            <div className="absolute top-72 right-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Frameworks & Libraries */}
            <div className="absolute top-104 left-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="package-managers" title="Package Managers" highlight="purple" />
              <RoadmapNode id="npm" title="npm" highlight="purple" />
              <RoadmapNode id="yarn" title="Yarn" highlight="green" />
              <RoadmapNode id="build-tools" title="Build Tools" highlight="purple" />
              <RoadmapNode id="webpack" title="Webpack" highlight="purple" />
              <RoadmapNode id="vite" title="Vite" highlight="green" />
            </div>
            <div className="absolute top-112 left-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Advanced Concepts */}
            <div className="absolute top-104 right-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="testing" title="Testing" highlight="purple" />
              <RoadmapNode id="jest" title="Jest" highlight="purple" />
              <RoadmapNode id="cypress" title="Cypress" highlight="green" />
              <RoadmapNode id="pwa" title="Progressive Web Apps" highlight="purple" />
              <RoadmapNode id="performance" title="Web Performance" highlight="purple" />
              <RoadmapNode id="security" title="Web Security" highlight="purple" />
            </div>
            <div className="absolute top-112 right-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Developer Tools */}
            <div className="absolute top-144 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 items-center">
              <RoadmapNode id="dev-tools" title="Developer Tools" isYellow={true} />
              <RoadmapNode id="chrome-devtools" title="Chrome DevTools" highlight="purple" />
              <RoadmapNode id="vs-code" title="VS Code" highlight="purple" />
              <RoadmapNode id="postman" title="Postman" highlight="purple" />
            </div>

            {/* Tooltip */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-2 opacity-80">
              <span className="font-bold text-yellow-400">TIP</span>
              <span>Click a topic to mark it as done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDevRoadmap;