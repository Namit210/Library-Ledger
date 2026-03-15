import { useEffect, useState } from "react"

export default function TableData({name}){
  const [transactionsdata, setTransactionsdata] = useState([]);
  useEffect(
    ()=>{
      fetch('http://localhost:4000/transactions/all')
      .then(response => response.json())
      .then(data => {
        setTransactionsdata(data);
      })
      .catch(error => console.error("Error fetching transactions:", error));
    }, []
  );

let transactions = transactionsdata;
  if(name !== 'Admin'){
    transactions = transactionsdata.filter(transaction => transaction.bace === name);
  
  }

  return (
    <table className="min-w-full">
      <thead className="sticky top-0 bg-gray-200 z-10">
        <tr >
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
          <tr className="text-center shadow-md transition transform hover: -translate-y-2 hover:shadow-xl" key={transaction._id}>
            <td className=" px-4 py-2">{ new Date(transaction.timestamp).toDateString()}</td>
            <td className=" px-4 py-2">{ new Date(transaction.timestamp).toLocaleTimeString()}</td>
            <td className=" px-4 py-2">{transaction.bace}</td>
            <td className=" px-4 py-2">{transaction.transaction_id}</td>
            <td className=" px-4 py-2">{transaction.total_books}</td>
            <td className=" px-4 py-2">{transaction.amount.paid}</td>
          </tr>
        ))}


      </tbody></table>
  )
}