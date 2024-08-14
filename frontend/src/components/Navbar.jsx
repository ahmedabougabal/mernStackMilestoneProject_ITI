import React, { useEffect, useState } from 'react';
import { FaBlog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';
import "../index.css"

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Shop", path: "/shop" },
    { link: "Sell Your Book", path: "/admin/dashboard" },
    { link: "Blog", path: "/blog" },
  ];

  return (
    <header className={isSticky ? 'sticky top-0 bg-white shadow-md' : ''}>
      <nav>
        <div className='flex items-center justify-between p-4'>
          {/* This is the logo :) */}
          <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center'>
            <FaBlog className='inline-block' /> BookWorm</Link>
          {/* These are the nav items */}
          <ul className='md:flex space-x-12 hidden'>
            {navItems.map(({link, path}) =>
              <Link key={path} to={path} 
              className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                {link} </Link> )}
          </ul> 
          {/* This is a button for large devices */}
          <div className='space-x-12 hidden lg:flex items-center'>
            <button>
              <FaBarsStaggered className='w-5 hover:text-blue-700' />
            </button>
          </div>
          {/* This is a menu button for mobile devices */}
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-black focus:outline-none'>
              {isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />}
            </button>
          </div>
        </div>
        {/* I will configure now how nav items should display on small devices */}
        <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? 'block fixed top-0 right-0 left-0' : 'hidden'}`}>
          {navItems.map(({ link, path }) => (
            <li key={path}>
              <Link to={path} className='block text-base text-white uppercase cursor-pointer hover:text-blue-700'>
                {link}
              </Link>
            </li>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;