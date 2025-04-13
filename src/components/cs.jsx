import React, { useState } from "react";
import { Check, Info, Shield, Lock } from "lucide-react";

const CybersecurityRoadmap = () => {
  const [completedNodes, setCompletedNodes] = useState(new Set([
    "networking-basics", "tcp-ip", "ports", "linux-basics", "windows-basics", 
    "command-line", "security-concepts", "nmap", "wireshark"
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
          <div className="text-3xl font-bold text-center mb-10">Cybersecurity</div>

          {/* Core diagram */}
          <div className="relative">
            {/* Central nodes */}
            <div className="flex flex-col items-center gap-16">
              <RoadmapNode id="foundation" title="Foundation" isYellow={true} size="normal" />
              <RoadmapNode id="networking" title="Networking" isYellow={true} size="normal" />
              <RoadmapNode id="operating-systems" title="Operating Systems" isYellow={true} size="normal" />
              <RoadmapNode id="security-domains" title="Security Domains" isYellow={true} size="normal" />
              <RoadmapNode id="specialization" title="Specialization" isYellow={true} size="normal" />
            </div>

            {/* Foundation */}
            <div className="absolute top-0 right-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="security-concepts" title="Basic Security Concepts" highlight="purple" />
              <RoadmapNode id="cia-triad" title="CIA Triad" highlight="purple" />
              <RoadmapNode id="security-models" title="Security Models" highlight="purple" />
              <RoadmapNode id="threat-landscape" title="Threat Landscape" highlight="purple" />
              <RoadmapNode id="security-tools" title="Security Tools Overview" highlight="purple" />
            </div>
            <div className="absolute top-8 left-1/2 transform translate-x-20 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Networking */}
            <div className="absolute top-24 left-0 grid grid-cols-1 gap-2 w-72">
              <RoadmapNode id="networking-basics" title="Networking Basics" highlight="purple" />
              <RoadmapNode id="tcp-ip" title="TCP/IP" highlight="purple" />
              <RoadmapNode id="ports" title="Ports & Services" highlight="purple" />
              <RoadmapNode id="vpn" title="VPNs" highlight="purple" />
              <RoadmapNode id="firewalls" title="Firewalls" highlight="purple" />
              <RoadmapNode id="dns" title="DNS" highlight="purple" />
            </div>
            <div className="absolute top-32 left-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Network Tools */}
            <div className="absolute top-24 right-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="network-tools" title="Network Tools" isYellow={true} />
              <RoadmapNode id="wireshark" title="Wireshark" highlight="purple" />
              <RoadmapNode id="nmap" title="Nmap" highlight="purple" />
              <RoadmapNode id="tcpdump" title="TCPdump" highlight="green" />
              <RoadmapNode id="netcat" title="Netcat" highlight="purple" />
            </div>
            <div className="absolute top-32 right-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Operating Systems */}
            <div className="absolute top-64 left-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="linux-basics" title="Linux Basics" highlight="purple" />
              <RoadmapNode id="linux-security" title="Linux Security" highlight="purple" />
              <RoadmapNode id="windows-basics" title="Windows Basics" highlight="purple" />
              <RoadmapNode id="windows-security" title="Windows Security" highlight="purple" />
              <RoadmapNode id="command-line" title="Command Line" highlight="purple" />
              <RoadmapNode id="bash-scripting" title="Bash Scripting" highlight="purple" />
              <RoadmapNode id="powershell" title="PowerShell" highlight="purple" />
            </div>
            <div className="absolute top-72 left-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Programming */}
            <div className="absolute top-64 right-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="programming" title="Programming" isYellow={true} />
              <RoadmapNode id="python" title="Python" highlight="purple" />
              <RoadmapNode id="bash" title="Bash" highlight="purple" />
              <RoadmapNode id="golang" title="Golang" highlight="green" />
              <RoadmapNode id="c" title="C" highlight="green" />
              <RoadmapNode id="javascript" title="JavaScript" highlight="green" />
            </div>
            <div className="absolute top-72 right-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Security Domains */}
            <div className="absolute top-104 left-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="web-security" title="Web Security" highlight="purple" />
              <RoadmapNode id="network-security" title="Network Security" highlight="purple" />
              <RoadmapNode id="crypto" title="Cryptography" highlight="purple" />
              <RoadmapNode id="malware-analysis" title="Malware Analysis" highlight="green" />
              <RoadmapNode id="incident-response" title="Incident Response" highlight="purple" />
              <RoadmapNode id="forensics" title="Digital Forensics" highlight="green" />
              <RoadmapNode id="cloud-security" title="Cloud Security" highlight="purple" />
            </div>
            <div className="absolute top-112 left-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Career Paths */}
            <div className="absolute top-104 right-0 flex flex-col gap-2 w-72">
              <RoadmapNode id="pentest" title="Penetration Testing" highlight="purple" />
              <RoadmapNode id="blue-team" title="Blue Team / SOC" highlight="purple" />
              <RoadmapNode id="appsec" title="Application Security" highlight="green" />
              <RoadmapNode id="security-engineer" title="Security Engineer" highlight="green" />
              <RoadmapNode id="grc" title="Governance & Compliance" highlight="green" />
              <RoadmapNode id="security-architect" title="Security Architecture" highlight="green" />
            </div>
            <div className="absolute top-112 right-80 w-32 h-0.5 border-t-2 border-dotted border-blue-500"></div>

            {/* Certifications */}
            <div className="absolute top-144 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 items-center">
              <RoadmapNode id="certifications" title="Certifications" isYellow={true} />
              <div className="grid grid-cols-2 gap-2">
                <RoadmapNode id="security-plus" title="Security+" highlight="purple" />
                <RoadmapNode id="ceh" title="CEH" highlight="green" />
                <RoadmapNode id="oscp" title="OSCP" highlight="purple" />
                <RoadmapNode id="cissp" title="CISSP" highlight="green" />
              </div>
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

export default CybersecurityRoadmap;    