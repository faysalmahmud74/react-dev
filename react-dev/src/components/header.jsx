// Header.js
import React, { useState, useEffect, useRef } from 'react';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DEFAULT_USER_IMAGE_URL } from './constants';
import Breadcrumbs from './breadcrumbs';

const Header = () => {
    const router = useNavigate();
    const [isMenu, setIsMenu] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        toast.error("Logged out");
        router('/');
    };

    const _toProfile = () => {
        router('/profile');
    };

    const toggleMenu = () => {
        setIsMenu(prev => !prev);  // Toggle the menu
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenu(false); // Close the menu
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='relative'>
            <header className="fixed top-0 w-full bg-white flex justify-between items-center p-4 border-b border-white z-50">
                <div className='flex'>
                    <div className='w-[255px]'>
                        <img
                            src='/pngkey.com-domino-png-2349823.png'
                            alt="Logo"
                            className="h-auto w-24 cursor-pointer"
                            onClick={() => router('/dashboard')}
                        />
                    </div>
                    <Breadcrumbs />
                </div>

                <img
                    src={DEFAULT_USER_IMAGE_URL}
                    alt="Avatar"
                    className="border rounded-full cursor-pointer"
                    style={{
                        height: 45,
                        width: 45,
                        objectFit: 'contain'
                    }}
                    onClick={toggleMenu}
                />

                {isMenu && (
                    <div ref={menuRef} className="absolute right-2 mt-20 w-48 bg-white shadow-md rounded z-50">
                        <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100" onClick={_toProfile}>
                            <FaUserCircle className="mr-2" />
                            Profile
                        </div>
                        <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100" onClick={handleLogout}>
                            <FaSignOutAlt className="mr-2" />
                            Log Out
                        </div>
                    </div>
                )}

            </header>
        </div>
    );
};

export default Header;