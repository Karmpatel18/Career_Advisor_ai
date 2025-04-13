import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white/95 backdrop-blur-md text-neutral-800 px-6 py-10 shadow-inner">
      

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-neutral-200 pt-10">
        {/* Info */}
        <div>
          <h3 className="font-bold text-lg mb-4">Info</h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>About Us</li>
            <li>Compressions</li>
            <li>Customers</li>
            <li>Service</li>
            <li>Collection</li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-bold text-lg mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>Free Courses</li>
            <li>Latest Technologies</li>
            <li>Projects</li>
            <li>New Uploads</li>
            <li>Resume Enhancer</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold text-lg mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>Customer Agreement</li>
            <li>Privacy Policy</li>
            <li>Security</li>
            <li>Testimonials</li>
            <li>Media Kit</li>
          </ul>
        </div>

        {/* Blog Posts and Events */}
        <div>
          <h3 className="font-bold text-lg mb-4">Blog Posts and Events</h3>
          <p className="text-sm text-neutral-600 mb-4">
            Subscribe to our Blogs & Events for a weekly dose of News of Events and Latest
            Technology, Updates, helpful tips.
          </p>
          <div className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 w-full bg-neutral-50/80 border border-neutral-200 rounded-l text-neutral-800 placeholder-neutral-500"
            />
            <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-r transition-all duration-300">
              SUBSCRIBE
            </button>
          </div>
          {/* Social Icons */}
          <div className="flex space-x-4 text-xl text-neutral-600">
            <FaFacebook className="hover:text-blue-600 cursor-pointer transition-colors duration-300" />
            <FaTwitter className="hover:text-sky-500 cursor-pointer transition-colors duration-300" />
            <FaLinkedin className="hover:text-blue-600 cursor-pointer transition-colors duration-300" />
            <FaGithub className="hover:text-neutral-800 cursor-pointer transition-colors duration-300" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
