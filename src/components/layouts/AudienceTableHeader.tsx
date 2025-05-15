import { Lock, Unlock } from 'lucide-react';

type AudienceTableHeaderProps = {
    tableHeader: string;
    tableSubHeader: string;
    lockButton: Function;
    resetButton: Function;
    tableType: string;
    lockStatus: boolean;
};

export const AudienceTableHeader: React.FC<AudienceTableHeaderProps> = ({
    tableHeader, tableSubHeader, lockButton, resetButton, tableType, lockStatus
}) => {
    return (
        <div className="flex justify-between items-center py-3">
            <div className={`flex ${tableType === "horizontal" ? 'flex-row' : 'flex-col'} gap-2`}>
                <h1 className="text-gray-800 text-base font-bold">
                    {tableHeader}
                </h1>
                <h2 className="text-gray-800 text-base font-medium">
                    {tableSubHeader}
                </h2>
            </div>

            <div className="flex gap-3">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                    onClick={() => resetButton()}>
                    Reset
                </button>

                <button className={`${ lockStatus ? 'bg-yellow-400' : 'bg-gray-300'} text-black px-4 py-2 rounded-md flex items-center gap-2 font-semibold transition`}
                    onClick={() => lockButton()}>
                    {lockStatus ? <Lock className="w-4 h-4" /> :
                        <Unlock className="w-4 h-4" />}
                    {lockStatus ? "UnLock" : "Lock"}
                </button>
            </div>
        </div>
    );
};
