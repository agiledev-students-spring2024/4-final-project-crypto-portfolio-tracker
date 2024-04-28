import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const DropdownMenu = ({ onRenameClick, onDeleteClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="text-lg p-2">
                <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            {isOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                    <li className="px-4 py-2 cursor-pointer text-black" onClick={onRenameClick}>Rename Portfolio</li>
                    <li className="px-4 py-2 cursor-pointer text-black" onClick={onDeleteClick}>Delete</li>
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
