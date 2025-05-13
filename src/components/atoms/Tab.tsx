import React from 'react';

interface TabProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
    return (
        <div
            className={`flex items-center border px-2 py-1 mr-2 rounded-t-lg cursor-pointer ${isActive ? 'bg-white border-b-white' : 'bg-gray-100'
                }`}
            onClick={onClick}
        >
            <span className="mr-2 text-sm font-medium">{label}</span>
            {label != "Footfall Data" &&<button className="text-red-500 text-sm" onClick={(e) => { e.stopPropagation();}}>✕</button>}
        </div>
    );
};