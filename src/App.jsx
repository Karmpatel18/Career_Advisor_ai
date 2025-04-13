import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup';

import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GetStarted from './components/Getstarted';
import Assessment from './components/Assessment';
import Roadmaps from './components/Roadmaps';
import Resume from './components/Resume';

import VideoStream from './components/VideoStream';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='text-neutral-800 font-inter'>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <GetStarted />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assessment"
              element={
                <ProtectedRoute>
                  <Assessment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roadmaps"
              element={
                <ProtectedRoute>
                  <Roadmaps />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume"
              element={
                <ProtectedRoute>
                  <Resume />
                </ProtectedRoute>
              }
            />
            <Route
              path="/session"
              element={
                <ProtectedRoute>
                  <VideoStream/>
                </ProtectedRoute>
              }
            />
            
            
            <Route path="*" element={<Navigate to="/signup" replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
