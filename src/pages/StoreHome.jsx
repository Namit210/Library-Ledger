import { API_BASE_URL } from "../config";
import Card from "../components/Card"
import BookButton from "../components/BookButton"
import TableData from "../components/TableData"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Pay from "../components/Pay";
import Request from "../components/Request";
import { SiBookstack } from "react-icons/si";
import { MdSportsScore } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

export default function StoreHome() {

  const [storeDetails, setStoreDetails] = useState({});
  const { id } = useParams();
  const [payVisible, setPayVisible] = useState(false);
  const [requestVisible, setRequestVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [monthScore, setMonthScore] = useState(0);
  const [role, setRole] = useState("store");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setRole(decoded.role);
    },[])
  

  useEffect(() => {
    const storeData = async () => {
      const response = await fetch(`${API_BASE_URL}/store/get-details/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setStoreDetails(data);
    };
    storeData();

    // Fetch all transactions for score calculation
    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}/transactions/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, [id]);

  useEffect(() => {
    // Calculate this month's score (sum of total_books for current month for this store)
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const score = transactions
      .filter((tx) => {
        const isNotRequest = !(tx.transaction_id.startsWith('request-'))
        const txDate = new Date(tx.timestamp);
        return tx.store === storeDetails.name && txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear && isNotRequest;
      })
      .reduce((sum, tx) => sum + (tx.total_books || 0), 0);
    setMonthScore(score);
  }, [transactions, storeDetails.name]);

 

  return (
    <div>

      <div className="flex justify-between flex-wrap px-6 items-center">
        <Card title={'Store Name'} desc={storeDetails.name} bg={'oklch(79.5% 0.184 86.047) '} />
        <div className="flex flex-wrap items-center justify-center">
        <Card title={'Instock'} desc={storeDetails.total_books} bg={'oklch(64.8% 0.2 131.684)'} icon={SiBookstack}/>
        <Card title={'This Month Allotment'} desc={monthScore} bg={'oklch(43.2% 0.232 292.759)'} icon={MdSportsScore}/>
        {
          role !== 'admin' &&
          <div className="flex flex-col items-center justify-center">

          < BookButton title={'Request Books'} color={'oklch(64.8% 0.2 131.684)'} onClick={()=>setRequestVisible(true)}/>
          
        </div>
        }
        

      </div>

      </div>
      
      <div className="m-2">
        <div className="m-2 text-2xl ">Transaction History</div>

        <div className="max-h-[70vh] overflow-y-auto border rounded-lg">
          <TableData name= {storeDetails.name} />
        </div>

      </div>

      <Pay isOpen={payVisible}  onClose={()=>setPayVisible(false)}/>
       <Request isOpen={requestVisible}
            onClose={()=>setRequestVisible(false)}/>

    </div>
  )

}


