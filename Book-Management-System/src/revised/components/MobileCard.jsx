export default function MobileCard({
  bace,
  tid,
  books,
  amount,
  timestamp,
  date,
  pending,
  role,
  name,
  onPay,
  onAllot
}) {
  return (
    <div className="font-lato p-4 mx-2 gap-2 shadow-lg rounded-lg bg-white mt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-300">
      <div className="flex justify-between text-green-700 border-b border-gray-300 pb-2">
        <div>{date}</div>
        <div>{timestamp}</div>
      </div>
      <div>
        <p className="text-sm font-bold text-green-900">BACE NAME</p>
        <h1 className="font-bold text-2xl">{bace}</h1>
      </div>
      <div>
        <p className="text-sm font-bold text-green-900 uppercase">Transaction Id</p>
        <div className="p-1 mx-1 bg-gray-200 rounded-lg">{tid}</div>
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