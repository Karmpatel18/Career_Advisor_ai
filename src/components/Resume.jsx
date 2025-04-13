import React, { useState } from "react";
import { Wand2, Scan, FileText, CloudUpload, Sparkles, AlertCircle } from "lucide-react";

const Resume = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [atsScore, setAtsScore] = useState(null);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.includes('pdf') && !selectedFile.type.includes('doc') && !selectedFile.type.includes('docx')) {
      setError("Please upload a PDF or DOC/DOCX file");
      return;
    }

    setFile(selectedFile);
    setError("");
    setAnalysis(null);
    setAtsScore(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('resume', selectedFile);

      const response = await fetch('http://localhost:3001/api/v1/resume/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to analyze resume');
      }

      setAnalysis(data.analysis);
      setAtsScore(data.atsScore);
    } catch (err) {
      console.error('Error analyzing resume:', err);
      setError(err.message || 'An error occurred while analyzing your resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-800 p-8 md:px-20">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Resume Analyzer</h1>
      <p className="text-center mb-12 text-lg">
        Upload your resume for AI-powered analysis and ATS scoring
      </p>

      {/* Upload Section */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <CloudUpload className="text-blue-500 w-12 h-12 mb-4" />
              <span className="text-lg font-medium">
                {file ? file.name : "Click to upload your resume"}
              </span>
              <span className="text-sm text-gray-500 mt-2">
                PDF or DOC/DOCX files only
              </span>
            </label>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing your resume...</p>
        </div>
      )}

      {analysis && (
        <div className="grid gap-8 md:grid-cols-2">
          {/* AI Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-blue-600" />
              <h2 className="text-xl font-semibold">AI Analysis</h2>
            </div>
            <div className="space-y-4">
              {analysis.strengths && (
                <div>
                  <h3 className="font-medium text-green-600">Strengths</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )}
              {analysis.improvements && (
                <div>
                  <h3 className="font-medium text-orange-600">Areas for Improvement</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    {analysis.improvements.map((improvement, index) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}
              {analysis.suggestions && (
                <div>
                  <h3 className="font-medium text-blue-600">Suggestions</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ATS Score */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-purple-600" />
              <h2 className="text-xl font-semibold">ATS Score</h2>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-4">
                {atsScore}%
              </div>
              <div className="space-y-4">
                {atsScore >= 80 ? (
                  <p className="text-green-600 font-medium">
                    Your resume is well-optimized for ATS systems!
                  </p>
                ) : atsScore >= 60 ? (
                  <p className="text-yellow-600 font-medium">
                    Your resume could use some optimization for better ATS compatibility.
                  </p>
                ) : (
                  <p className="text-red-600 font-medium">
                    Your resume needs significant optimization for ATS systems.
                  </p>
                )}
                <div className="space-y-2">
                  <h3 className="font-medium">Key Factors:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Keyword Optimization</li>
                    <li>• Formatting and Structure</li>
                    <li>• Content Relevance</li>
                    <li>• Professional Experience</li>
                    <li>• Education and Skills</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
