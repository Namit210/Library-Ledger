import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { createPortal } from "react-dom";

export default function MobileCard({
  store,
  tid,
  books,
  amount,
  timestamp,
  date,
  pending,
  role,
  name,
  onPay,
  onAllot,
  desc,
  _id
}) {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className="font-lato p-4 mx-2 gap-2 shadow-lg rounded-lg bg-white mt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-300">
      <div className="flex justify-between text-green-700 border-b border-gray-300 pb-2">
        <div>{date}</div>
        <div>{timestamp}</div>
      </div>
      <div>
        <p className="text-sm font-bold text-green-900">Store NAME</p>
        <h1 className="font-bold text-2xl">{store}</h1>
      </div>
      <div>
        <p className="text-sm font-bold text-green-900 uppercase flex items-center gap-1">
          Transaction Id
          {desc && (
            <span
              className="ml-1 cursor-pointer inline-flex items-center"
              onClick={() => setShowDesc(true)}
              data-tooltip-id={_id}
            >
              <FiInfo className="text-lg text-gray-500 hover:text-blue-500 transition-colors duration-200" />
            </span>
          )}
        </p>
        <div className="p-1 mx-1 bg-gray-200 rounded-lg">{tid}</div>
        {/* Tooltip Portal for mobile: show as modal */}
        {showDesc && desc && createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            onClick={() => setShowDesc(false)}
          >
            <div
              className="bg-white border border-gray-400 shadow-lg rounded p-4 text-left text-gray-800 font-normal animate-fade-in max-w-xs w-full mx-4 relative"
              onClick={e => e.stopPropagation()}
            >
              <span className="font-semibold">Description: </span>{desc}
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                onClick={() => setShowDesc(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>,
          document.body
        )}
      </div>
      <div className="flex justify-between mt-2 items-center gap-2">
        <div>
          <p className="text-sm font-bold text-green-900 uppercase">Total Books</p>
          <h1 className="font-bold text-l">{books}</h1>
        </div>
        <div>
          {/* Pay/Allot buttons logic, same as desktop */}
          {pending !== 0 && name !== 'Admin' && role !== 'admin' && (
            <button
              className="px-2 bg-blue-300 text-lg rounded-md ml-2 hover:bg-blue-600 transition duration-300"
              onClick={onPay}
            >
              Pay
            </button>
          )}
          {pending === 0 && amount === 0 && role === 'admin' && (
            <button
              className="px-2 bg-yellow-200 rounded-md ml-2 hover:bg-green-800 transition duration-300 font-outfit text-lg"
              onClick={onAllot}
            >
              Allot
            </button>
          )}
        </div>
        <div>
          <p className="text-sm font-bold text-green-900 uppercase">Amount</p>
          <h1 className="font-bold text-l">₹ {amount}</h1>
        </div>
      </div>
    </div>
  );
}