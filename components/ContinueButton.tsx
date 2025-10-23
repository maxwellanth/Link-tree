import React from 'react';

interface ContinueButtonProps {
    isVisible: boolean;
    onClick: () => void;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({ isVisible, onClick }) => {
    const buttonClasses = `
        px-8 py-3 mt-8 font-mono font-bold text-lg text-[#e6eaef]
        bg-gradient-to-b from-gray-500 to-gray-700
        border-2 border-t-gray-400 border-l-gray-400 border-b-gray-800 border-r-gray-800
        rounded-md shadow-lg transition-all duration-300
        hover:shadow-[0_0_15px_rgba(230,234,239,0.5)] hover:from-gray-400 hover:to-gray-600
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0d3c78] focus:ring-gray-300
    `;

    return (
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {isVisible && (
                <button onClick={onClick} className={buttonClasses}>
                    Continue
                </button>
            )}
        </div>
    );
};
