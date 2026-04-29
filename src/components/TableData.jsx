import { API_BASE_URL } from "../config";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import SearchInput from "./SearchInput";
import Pay from "./Pay";
import { jwtDecode } from "jwt-decode";
import Allot from "./Allot";
import { FiInfo } from "react-icons/fi";
import MobileCard from "./MobileCard";

export default function TableData({ name }) {
  const [allTransactionsdata, setAllTransactionsdata] = useState([]);
  const [query, setQuery] = useState("");
  const [payVisible, setPayVisible] = useState(false);
  const [allotVisible, setAllotVisible] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [role, setRole] = useState("store");
  const [hoveredTxId, setHoveredTxId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    } catch (error) {
      
    }
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    fetch(`${API_BASE_URL}/transactions/all`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAllTransactionsdata(data))
      .catch((error) =>
        console.error("Error fetching transactions:", error)
      );
  }, []);


  // ✅ Combined filtering (role + search)
  const transactions = allTransactionsdata.filter((transaction) => {
    const matchesRole = name === "Admin" || transaction.store === name;
    const matchesSearch =
      query.trim() === "" ||
      transaction.bace?.toLowerCase().includes(query.toLowerCase()) ||
      transaction.transaction_id?.toLowerCase().includes(query.toLowerCase());
    return matchesRole && matchesSearch;
  });



  return (
    <div>
      {/* Search bar stays fixed above the scrollable table */}
      <div className="mb-2 md:static sticky top-0 z-30 bg-white pt-2 pb-2 md:pt-0 md:pb-0">
        <SearchInput onSearch={setQuery} />
      </div>
      {/* Mobile view: show MobileCard, hidden on md+ screens */}
      <div className="md:hidden">
        {transactions.map((row) => (
          <MobileCard
            key={row._id}
            store={row.store}
            tid={row.transaction_id}
            books={row.total_books}
            amount={row.amount?.paid}
            pending={row.amount?.pending}
            timestamp={new Date(row.timestamp).toLocaleTimeString()}
            date={new Date(row.timestamp).toDateString()}
            role={role}
            name={name}
            onPay={() => { setPayVisible(true); setSelectedTx(row); }}
            onAllot={() => { setAllotVisible(true); setSelectedTx(row); }}
            desc={row.desc}
            _id={row._id}
          />
        ))}
      </div>
      {/* Desktop/tablet view: show table, hidden on small screens */}
      <div className="max-h-[400px] overflow-x-auto overflow-y-auto border rounded-lg bg-gray-50 p-2 font-lato hidden md:block">
        <div className="min-w-full">
          <div className="grid grid-cols-6 gap-2 font-semibold bg-gray-200 rounded-t-lg px-2 py-3 text-center text-sm md:text-base">
            <div>Date</div>
            <div>Time</div>
            <div>Store Name</div>
            <div>Transaction ID</div>
            <div>Total books</div>
            <div>Amount</div>
          </div>
          <div className="space-y-4 mt-2">
            {transactions.map((row) => (
              <div
                key={row._id}
                className="grid grid-cols-6 gap-2 items-center bg-white rounded-xl shadow-lg px-2 py-4 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl border border-gray-200"
              >
                <div>{new Date(row.timestamp).toDateString()}</div>
                <div>{new Date(row.timestamp).toLocaleTimeString()}</div>
                <div>{row.store}</div>
                <div>
                  <div className="flex items-center justify-center relative">
                    <span>{row.transaction_id}</span>
                    {row.desc && (
                      <span
                        className="ml-2 cursor-pointer relative inline-flex items-center"
                        onMouseEnter={() => setHoveredTxId(row._id)}
                        onMouseLeave={() => setHoveredTxId(null)}
                        data-tooltip-id={row._id}
                      >
                        <FiInfo className="text-xl text-gray-500 hover:text-blue-500 transition-colors duration-200" />
                      </span>
                    )}
                    {/* Tooltip Portal */}
                    {hoveredTxId === row._id && row.desc && (() => {
                      const iconEl = document.querySelector(`[data-tooltip-id='${row._id}']`);
                      let style = { position: 'fixed', left: '50vw', top: '20vh', zIndex: 9999 };
                      if (iconEl) {
                        const rect = iconEl.getBoundingClientRect();
                        style = {
                          position: 'fixed',
                          left: rect.left + rect.width / 2,
                          top: rect.top - 12,
                          transform: 'translate(-50%, -100%)',
                          zIndex: 9999
                        };
                      }
                      return createPortal(
                        <div style={style} className="min-w-[200px] max-w-xs bg-white border border-gray-400 shadow-lg rounded p-2 text-left text-gray-800 font-normal animate-fade-in">
                          <span className="font-semibold">Description: </span>{row.desc}
                        </div>,
                        document.body
                      );
                    })()}
                  </div>
                </div>
                <div>{row.total_books}</div>
                <div>
                  <div className="flex flex-wrap justify-center items-center">
                    {row.amount.paid}
                    {row.amount.pending !== 0 && name !== 'Admin' && role !== 'admin' && (
                      <div onClick={() => { setPayVisible(true); setSelectedTx(row); }}>
                        <button className="px-2 bg-blue-300 text-lg rounded-md ml-2 sm:ml-4 hover:bg-blue-600 transition duration-300">
                          Pay
                        </button>
                      </div>
                    )}
                    {row.amount.pending === 0 && row.amount.paid === 0 && role === 'admin' && (
                      <div onClick={() => { setAllotVisible(true); setSelectedTx(row); }}>
                        <button className="px-2 bg-yellow-200 rounded-md ml-2 sm:ml-4 hover:bg-green-800 transition duration-300 font-outfit text-lg">
                          Allot
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pay isOpen={payVisible} onClose={() => setPayVisible(false)} tx={selectedTx}  onSuccess={(updatedTx) => {
        setAllTransactionsdata((prev) =>
          prev.map((t) =>
            t._id === updatedTx._id ? updatedTx : t
          )
        );
      }}/>
      <Allot isOpen={allotVisible} onClose={() => setAllotVisible(false)} tx={selectedTx} onSuccess={(updatedTx) => {
        setAllTransactionsdata((prev) =>
          prev.map((t) =>
            t._id === updatedTx._id ? updatedTx : t
          )
        );
      }} />
    </div>
  );
}