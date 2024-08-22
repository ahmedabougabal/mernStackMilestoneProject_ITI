import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-1 bg-black py-8 sm:py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
          <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6">
            <h5 className="text-xl font-bold mb-6">Features</h5>
            <ul className="list-none footer-links">
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Cool stuff</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Random feature</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Team feature</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Stuff for developers</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Another one</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Last time</a>
              </li>
            </ul>
          </div>
          <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 sm:mt-0">
            <h5 className="text-xl font-bold mb-6">Resources</h5>
            <ul className="list-none footer-links">
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Resource</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Resource name</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Another resource</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Final resource</a>
              </li>
            </ul>
          </div>
          <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
            <h5 className="text-xl font-bold mb-6">About</h5>
            <ul className="list-none footer-links">
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Team</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Locations</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Privacy</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Terms</a>
              </li>
            </ul>
          </div>
          <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
            <h5 className="text-xl font-bold mb-6">Help</h5>
            <ul className="list-none footer-links">
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Support</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="#" className="border-b border-solid border-transparent hover:border-white hover:text-white">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
            <h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left">Stay connected</h5>
            <div className="flex sm:justify-center xl:justify-start">
              <a href="#" className="w-8 h-8 border border-2 border-gray-400 rounded-full text-center py-1 text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="w-8 h-8 border border-2 border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-blue-400 hover:border-blue-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-8 h-8 border border-2 border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-red-600 hover:border-red-600">
                <i className="fab fa-google-plus-g"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="sm:flex sm:flex-wrap sm:-mx-4 mt-6 pt-6 sm:mt-12 sm:pt-12 border-t border-gray-600">
          <div className="sm:w-full px-4 md:w-1/6">
            <strong>FWR</strong>
          </div>
          <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
            <h6 className="font-bold mb-2">Address</h6>
            <address className="not-italic mb-4 text-sm">
              123 6th St.<br />
              Melbourne, FL 32904
            </address>
          </div>
          <div className="px-4 sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
            <h6 className="font-bold mb-2">Free Resources</h6>
            <p className="mb-4 text-sm">Use our HTML blocks for <strong>FREE</strong>.<br />
              <em>All are MIT License</em></p>
          </div>
          <div className="px-4 md:w-1/4 md:ml-auto mt-6 sm:mt-4 md:mt-0">
            <button className="px-4 py-2 bg-purple-800 hover:bg-purple-900 rounded text-white">Get Started</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
