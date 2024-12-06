export const SuccessPopup = ({ grid = { cols: 3, rows: 4 }, height, width}: any) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-3/4 w-3/4 p-1">
        <div className={`grid gap-4 w-full h-full p-4`}>
          <div
            // key={`col-${colIndex}`}
            className={`p-2 animate-pulse bg-[#D7D7D7] rounded h-20`}
          ></div>
        </div>
      </div>
    </div>
  );
};
