import React, { useState } from 'react';

const AddressModal = ({ isOpen, onClose, address }) => {
    if (!isOpen) return null

    return (
        <div className="modal">
            <div className="modal-background" onClick={onClose}>
                <div className="modal-content">
                    <span className="modal-close-button" onClick={onClose}>
                        &times;
                    </span>
                    <p>{address}</p>
                </div>
            </div>
        </div>
    )
}

export default AddressModal
