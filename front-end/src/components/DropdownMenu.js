import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const DropdownMenu = ({ onRenameClick, onDeleteClick }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    const toggleDropdown = () => setIsOpen(!isOpen)

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="p-2 text-lg">
                <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            {isOpen && (
                <ul className="absolute right-0 z-10 mt-2 w-48 rounded-lg bg-white shadow-lg">
                    <li
                        className="cursor-pointer px-4 py-2 text-black"
                        onClick={() => {
                            onDeleteClick()
                            setIsOpen(false)
                        }}
                    >
                        Delete
                    </li>
                </ul>
            )}
        </div>
    )
}

export default DropdownMenu
