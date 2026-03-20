import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Pay from "./Pay";

export default function TableData({ name }) {
  const [allTransactionsdata, setAllTransactionsdata] = useState([]);
  const [query, setQuery] = useState("");
  const [payVisible, setPayVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/transactions/all")
      .then((response) => response.json())
      .then((data) => setAllTransactionsdata(data))
      .catch((error) =>
        console.error("Error fetching transactions:", error)
      );
  }, []);

  // ✅ Combined filtering (role + search)
  const transactions = allTransactionsdata.filter((transaction) => {
    const matchesRole =
      name === "Admin" || transaction.bace === name;

    const matchesSearch =
      query.trim() === "" ||
      transaction.bace?.toLowerCase().includes(query.toLowerCase()) ||
      transaction.transaction_id?.toLowerCase().includes(query.toLowerCase());

    return matchesRole && matchesSearch;
  });

  return (
    <div>

      <SearchInput onSearch={setQuery} />
      <table className="min-w-full">
        <thead className="sticky top-0 bg-gray-200 z-10">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Bace Name</th>
            <th className="px-4 py-2">Transaction ID</th>
            <th className="px-4 py-2">Total books</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction._id}
              className="text-center shadow-md transition transform hover:-translate-y-2 hover:shadow-xl"
            >
              <td className="px-4 py-2">
                {new Date(transaction.timestamp).toDateString()}
              </td>
              <td className="px-4 py-2">
                {new Date(transaction.timestamp).toLocaleTimeString()}
              </td>
              <td className="px-4 py-2">{transaction.bace}</td>
              <td className="px-4 py-2">{transaction.transaction_id}</td>
              <td className="px-4 py-2">{transaction.total_books}</td>
              <td className="px-4 py-2 flex flex-wrap justify-center                                                ">{transaction.amount.paid}
                {transaction.amount.pending !== 0 && name !=='Admin' &&(
                <div onClick={
            ()=>{setPayVisible(true)}
          }>
                <button className="px-2 bg-blue-400 text-white rounded-md ml-4 hover:bg-blue-600 transition duration-300">
                  Pay
                </button>
                </div>)
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pay isOpen={payVisible} onClose={() => setPayVisible(false)} />
    </div>
  );
}