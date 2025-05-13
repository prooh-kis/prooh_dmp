import { Lock } from 'lucide-react';

type AudienceTableHeaderProps = {
    tableHeader: string;
    tableSubHeader: string;
    lockButton: Function;
    resetButton: Function;
    tableType: string;
};

export const AudienceTableHeader: React.FC<AudienceTableHeaderProps> = ({
    tableHeader, tableSubHeader, lockButton, resetButton, tableType
}) => {
    return (
        <div className="flex justify-between items-center py-3">
            <div className={`flex ${tableType === "horizontal" ? 'flex-row' : 'flex-col' } gap-2`}>
                <h1 className="text-gray-800 text-base font-bold">
                    {tableHeader}
                </h1>
                <h2 className="text-gray-800 text-base font-medium">
                    {tableSubHeader}
                </h2>
            </div>

            <div className="flex gap-3">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                    Reset
                </button>

                <button className="bg-yellow-400 text-black px-4 py-2 rounded-md flex items-center gap-2 font-semibold hover:bg-yellow-300 transition">
                    <Lock className="w-4 h-4" />
                    Lock
                </button>
            </div>
        </div>
    );
};
