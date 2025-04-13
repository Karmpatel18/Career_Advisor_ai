import React, { useState, useEffect } from "react";
import {
  Code,
  Shield,
  BarChart,
  Server,
  Brain,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";
import { useLocation } from "react-router-dom";

const roadmaps = [
  {
    title: "Web Development",
    icon: <Code className="text-blue-600" />,
    description: "Journey from HTML basics to building complete web applications with modern frameworks and databases.",
    details: [
      { 
        step: "Learn HTML, CSS, JavaScript", 
        month: "Month 1",
        description: "Master the foundational technologies of the web. Create static pages with HTML, style them with CSS, and add interactivity with JavaScript."
      },
      { 
        step: "Learn Git & GitHub", 
        month: "Month 2",
        description: "Understand version control fundamentals. Learn to track changes, branch, merge, and collaborate with other developers using Git and GitHub."
      },
      { 
        step: "Frontend framework (React, Vue)", 
        month: "Month 3",
        description: "Build dynamic, component-based user interfaces with popular frontend frameworks. Create reusable components and manage application state."
      },
      { 
        step: "Backend basics (Node.js, Express)", 
        month: "Month 4",
        description: "Develop server-side applications with JavaScript. Create APIs, handle HTTP requests, and manage server logic with Node.js and Express."
      },
      { 
        step: "Databases (MongoDB, PostgreSQL)", 
        month: "Month 5",
        description: "Store and manage application data efficiently. Learn both SQL and NoSQL database concepts, queries, and data modeling."
      },
      { 
        step: "Build full-stack projects", 
        month: "Month 6",
        description: "Combine all your skills to create complete web applications. Develop projects that integrate frontend, backend, and database technologies."
      },
    ],
  },
  {
    title: "Data Science",
    icon: <BarChart className="text-purple-600" />,
    description: "Transform from a programming beginner to a data scientist capable of building predictive models and extracting insights.",
    details: [
      { 
        step: "Learn Python & libraries", 
        month: "Month 1",
        description: "Master Python basics and essential data science libraries like NumPy and Pandas. Learn to manipulate, clean, and analyze data efficiently."
      },
      { 
        step: "Statistics & Probability", 
        month: "Month 2",
        description: "Build a strong mathematical foundation. Understand descriptive statistics, probability distributions, and inferential statistics for data analysis."
      },
      { 
        step: "Data Visualization", 
        month: "Month 3",
        description: "Convert data into compelling visuals using Matplotlib, Seaborn, and Plotly. Learn to tell stories and communicate insights through visualizations."
      },
      { 
        step: "ML basics", 
        month: "Month 4",
        description: "Understand fundamental machine learning concepts and algorithms. Learn supervised and unsupervised learning, model evaluation, and validation techniques."
      },
      { 
        step: "Work on datasets", 
        month: "Month 5",
        description: "Apply your skills to real-world datasets. Practice data cleaning, feature engineering, and implementing machine learning pipelines."
      },
      { 
        step: "Build predictive models", 
        month: "Month 6",
        description: "Develop end-to-end predictive solutions. Create models that solve real problems, tune for optimal performance, and interpret results."
      },
    ],
  },
  {
    title: "Cybersecurity",
    icon: <Shield className="text-red-600" />,
    description: "Develop from a network novice to a security professional who can identify, analyze, and mitigate threats.",
    details: [
      { 
        step: "Networking Fundamentals", 
        month: "Month 1",
        description: "Understand how computer networks function. Learn TCP/IP protocols, routing, switching, and network architecture fundamentals."
      },
      { 
        step: "Linux Basics", 
        month: "Month 2",
        description: "Master the Linux operating system and command line. Learn system administration, file management, and security configuration in Linux."
      },
      { 
        step: "Web Security & Encryption", 
        month: "Month 3",
        description: "Understand common web vulnerabilities and secure coding practices. Learn encryption principles, SSL/TLS, and authentication mechanisms."
      },
      { 
        step: "Practice labs (TryHackMe)", 
        month: "Month 4",
        description: "Apply security knowledge in practical scenarios. Practice vulnerability assessment, penetration testing, and secure system hardening."
      },
      { 
        step: "Firewalls & IDS", 
        month: "Month 5",
        description: "Configure network protection systems. Learn to set up and manage firewalls, intrusion detection systems, and security monitoring tools."
      },
      { 
        step: "Malware Analysis", 
        month: "Month 6",
        description: "Analyze and reverse engineer malicious software. Learn techniques to detect, contain, and understand the behavior of various malware types."
      },
    ],
  },
  {
    title: "Cloud Computing",
    icon: <Server className="text-indigo-600" />,
    description: "Progress from understanding virtualization to architecting and managing complex cloud-native applications and infrastructure.",
    details: [
      { 
        step: "Cloud & Virtualization", 
        month: "Month 1",
        description: "Understand the fundamentals of cloud computing. Learn virtualization concepts, cloud service models, and infrastructure as code principles."
      },
      { 
        step: "AWS/GCP/Azure Basics", 
        month: "Month 2",
        description: "Get familiar with major cloud platforms. Set up accounts, navigate consoles, and understand core services and pricing models."
      },
      { 
        step: "Key services (EC2, S3)", 
        month: "Month 3",
        description: "Master essential cloud services. Deploy virtual machines, manage storage, set up networking, and implement security best practices."
      },
      { 
        step: "CI/CD & DevOps Tools", 
        month: "Month 4",
        description: "Automate deployment pipelines. Learn to use tools like Docker, Kubernetes, Jenkins, and GitHub Actions for continuous integration and delivery."
      },
      { 
        step: "Cloud-native apps", 
        month: "Month 5",
        description: "Develop applications optimized for cloud environments. Master serverless computing, microservices architecture, and container orchestration."
      },
      { 
        step: "Certifications", 
        month: "Month 6",
        description: "Validate your cloud expertise with industry-recognized certifications. Prepare for AWS, Azure, or GCP professional certification exams."
      },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: <Brain className="text-green-600" />,
    description: "Evolve from understanding basic algorithms to implementing sophisticated machine learning models and neural networks.",
    details: [
      { 
        step: "Python & Linear Algebra", 
        month: "Month 1",
        description: "Build essential technical foundations. Master Python programming and the linear algebra concepts critical for machine learning algorithms."
      },
      { 
        step: "ML Algorithms", 
        month: "Month 2",
        description: "Understand core machine learning techniques. Learn regression, classification, clustering, and the mathematical principles behind them."
      },
      { 
        step: "Scikit-learn & TensorFlow", 
        month: "Month 3",
        description: "Master popular ML frameworks. Implement algorithms using Scikit-learn and build neural networks with TensorFlow and Keras."
      },
      { 
        step: "Deep Learning", 
        month: "Month 4",
        description: "Explore neural network architectures. Learn CNNs for computer vision, RNNs and Transformers for NLP, and other specialized networks."
      },
      { 
        step: "ML Projects", 
        month: "Month 5",
        description: "Apply your knowledge to real-world problems. Build end-to-end machine learning projects including data preparation, modeling, and evaluation."
      },
      { 
        step: "Fine-tuning & Research", 
        month: "Month 6",
        description: "Advanced techniques and current research. Learn model optimization, hyperparameter tuning, and stay current with latest AI research papers."
      },
    ],
  },
  {
    title: "DevOps",
    icon: <Code className="text-orange-600" />,
    description: "Master the art of continuous integration, deployment, and infrastructure automation to bridge development and operations.",
    details: [
      { 
        step: "Linux & Scripting", 
        month: "Month 1",
        description: "Learn Linux fundamentals and shell scripting. Master command line operations, file systems, and automation scripts."
      },
      { 
        step: "Version Control & CI/CD", 
        month: "Month 2",
        description: "Understand Git workflows and CI/CD pipelines. Learn to automate build, test, and deployment processes."
      },
      { 
        step: "Containerization", 
        month: "Month 3",
        description: "Master Docker and container orchestration. Learn to containerize applications and manage containerized environments."
      },
      { 
        step: "Infrastructure as Code", 
        month: "Month 4",
        description: "Learn Terraform and Ansible. Automate infrastructure provisioning and configuration management."
      },
      { 
        step: "Cloud Platforms", 
        month: "Month 5",
        description: "Understand cloud services and deployment. Learn to deploy and manage applications on AWS, Azure, or GCP."
      },
      { 
        step: "Monitoring & Logging", 
        month: "Month 6",
        description: "Implement monitoring and logging solutions. Learn to track system performance and troubleshoot issues."
      },
    ],
  },
];

const colorClasses = {
  "Web Development": {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    hover: "hover:bg-blue-100",
    icon: "text-blue-600",
    desc: "text-blue-700"
  },
  "Data Science": {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-800",
    hover: "hover:bg-purple-100",
    icon: "text-purple-600",
    desc: "text-purple-700"
  },
  "Cybersecurity": {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    hover: "hover:bg-red-100",
    icon: "text-red-600",
    desc: "text-red-700"
  },
  "Cloud Computing": {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-800",
    hover: "hover:bg-indigo-100",
    icon: "text-indigo-600",
    desc: "text-indigo-700"
  },
  "AI & Machine Learning": {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    hover: "hover:bg-green-100",
    icon: "text-green-600",
    desc: "text-green-700"
  },
  "DevOps": {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800",
    hover: "hover:bg-orange-100",
    icon: "text-orange-600",
    desc: "text-orange-700"
  }
};

// A roadmap step component with description
const RoadmapStep = ({ item, index, isLast, colors }) => {
  const [showDescription, setShowDescription] = useState(false);
  
  return (
    <div className="relative">
      <div className={`flex items-start mb-6 ${!isLast ? "pb-2" : ""}`}>
        {/* Step number circle */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center ${colors.text} font-bold z-10 mt-1`}>
          {index + 1}
        </div>
        
        {/* Content */}
        <div className={`ml-4 p-4 rounded-lg ${colors.bg} ${colors.border} border w-full shadow-sm ${colors.hover} transition-colors duration-200`}>
          <div className="flex justify-between items-center">
            <div className="font-medium">{item.month}</div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowDescription(!showDescription);
              }}
              className={`${colors.text} hover:bg-white hover:bg-opacity-50 p-1 rounded-full transition-colors duration-200`}
            >
              <Info size={18} />
            </button>
          </div>
          <div className={`${colors.text} mt-1 font-semibold`}>{item.step}</div>
          
          {showDescription && (
            <div className={`mt-3 pt-3 border-t ${colors.border} ${colors.desc} text-sm`}>
              {item.description}
            </div>
          )}
        </div>
      </div>
      
      {/* Connector line */}
      {!isLast && (
        <div className={`absolute left-5 top-10 h-full w-0.5 -ml-0.5 ${colors.border}`}></div>
      )}
    </div>
  );
};

const Roadmap = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check if we have a selected index in the state
    if (location.state?.selectedIndex !== undefined) {
      setOpenIndex(location.state.selectedIndex);
    }
  }, [location.state]);

  const toggleRoadmap = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-800 p-8 md:px-12">
      <h1 className="text-3xl font-bold text-center mb-8">Career Roadmaps</h1>
      <p className="text-center mb-10 text-lg">Explore step-by-step learning paths for different tech domains.</p>

      <div className="space-y-6 max-w-4xl mx-auto">
        {roadmaps.map((roadmap, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden transition duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer p-6"
              onClick={() => toggleRoadmap(index)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${colorClasses[roadmap.title].bg}`}>
                  {roadmap.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{roadmap.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{roadmap.description}</p>
                </div>
              </div>
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </div>

            {openIndex === index && (
              <div className="px-6 pb-6">
                <div className="pl-4 pt-2 pb-6">
                  {roadmap.details.map((item, i) => (
                    <RoadmapStep 
                      key={i} 
                      item={item} 
                      index={i} 
                      isLast={i === roadmap.details.length - 1}
                      colors={colorClasses[roadmap.title]}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;