import React from 'react';

const AddressModal = ({ isOpen, onClose, address }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
            <div className="relative w-full max-w-lg p-4 mx-2 bg-white rounded-lg shadow-lg md:mx-0">
                <button
                    className="absolute top-0 right-0 p-1 text-xl font-bold leading-none text-black bg-transparent border-none"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h3 className="text-lg font-semibold">Address Details</h3>
                <p className="mt-2 text-sm text-gray-600">{address}</p>
            </div>
        </div>
    );
}

export default AddressModal;
