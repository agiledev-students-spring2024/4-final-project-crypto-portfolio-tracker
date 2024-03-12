import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faXmark,
    faHome,
    faSignInAlt,
    faCog,
    faInfoCircle,
    faBriefcase,
    faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative md:hidden">
            <button onClick={toggleMenu} className="text-xl z-30 absolute top-0 left-0">
                <FontAwesomeIcon
                    icon={isOpen ? faXmark : faBars}
                    style={{ fontSize: '32px' }}
                />
            </button>
            <div
                className={`fixed top-[50px] left-0 h-full w-2/3 bg-white dark:bg-dark-blue p-5 transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } z-20`} 
            >
                <Link
                    to="/"
                    className="flex items-center px-4 py-2 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
                </Link>
                <Link
                    to="/login"
                    className="flex items-center px-4 py-2 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> Login
                </Link>
                <Link
                    to="/portfolio"
                    className="flex items-center px-4 py-2 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> My Portfolio
                </Link>
                <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
                </Link>
                <Link
                    to="/news"
                    className="flex items-center px-4 py-2 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faNewspaper} className="mr-2" /> News
                </Link>
                <Link
                    to="/about"
                    className="flex items-center px-4 py-2 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> About
                </Link>
            </div>
        </div>
    );
};

export default Hamburger;
