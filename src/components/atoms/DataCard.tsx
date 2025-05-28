import { Tooltip } from 'antd';
import React from 'react';

interface DataCardProps {
    title: string;
    source: string;
    value: number;
    icon: string;
}

export const DataCard: React.FC<DataCardProps> = ({ title, source, value, icon }) => {
    return (
        <div className={`border rounded-lg p-4 w-full bg-white`}>
            <div className='flex flex-col'>
                <div className='grid grid-cols-12 gap-2'>
                    <div className="col-span-3 w-10 h-10 rounded-full bg-[#50A280] flex items-center justify-center">
                        <i className={`${icon} text-white flex items-center justify-center`}></i>
                    </div>
                    <div className='col-span-9 flex flex-col truncate'>
                        <Tooltip title={title}>
                            <p className="font-normal text-[16px] text-[#000000] truncate cursor-pointer">{title}</p>
                        </Tooltip>
                        <p
                            className={`${value !== 0 ? "text-[#6F7F8E]" : "text-[#FF5050]"
                                } font-medium text-[14px]`}
                        >
                            {value !== 0 ? `Source - ${source}` : "Coming soon"}
                        </p>                    </div>
                </div>
                <div className='border-b my-2'></div>
                <div>
                    <p className="font-medium text-[20px] text-[#3A9868]">{value}</p>
                </div>
            </div>
        </div>
    );
};