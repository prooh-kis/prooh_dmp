import React from 'react';

interface DataCardProps {
    title: string;
    source: string;
    value: number;
}

export const DataCard: React.FC<DataCardProps> = ({ title, source, value }) => {
    return (
        <div className={`border rounded-lg p-4 w-60 ${value === 0 ? 'bg-gray-100 text-gray-400' : 'bg-white'}`}>
            <p className="font-semibold text-sm">{title}</p>
            <p className="text-xs mb-2">Source - {source}</p>
            <p className="text-lg font-bold">{value}</p>
        </div>
    );
};