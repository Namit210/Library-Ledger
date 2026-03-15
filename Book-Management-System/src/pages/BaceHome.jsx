import Card from "../components/Card"
import BookButton from "../components/BookButton"
import TableData from "../components/TableData"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function BaceHome() {

  const [baceDetails, setBaceDetails] = useState({});
const { id } = useParams();

  useEffect(
    ()=>{
      const baceData = async ()=>{
        const response = await fetch(`http://localhost:4000/bace/get-details/${id}`);
        const data = await response.json();
        setBaceDetails(data);
      }

        baceData();
    },
    [id]

  )

 

  return (
    <div>

      <div className="flex justify-between flex-wrap px-6 items-center">
        <Card title={baceDetails.name} desc={'location'} bg={'oklch(79.5% 0.184 86.047) '} />
        <div className="flex flex-wrap items-center justify-center">
        <Card title={'Instock'} desc={baceDetails.total_books} bg={'oklch(64.8% 0.2 131.684)'} />
        <Card title={'This month Score'} desc={140} bg={'oklch(43.2% 0.232 292.759)'} />

        <div className="flex flex-col items-center justify-center">

          < BookButton title={'Request Books'} color={'oklch(64.8% 0.2 131.684)'} />
          < BookButton title={'Submit Payment Info'} color={'oklch(70.7% 0.165 254.624)'} />
        </div>

      </div>

      </div>
      
      <div className="m-2">
        <div className="m-2 text-2xl ">Transaction History</div>

        <div className="max-h-[70vh] overflow-y-auto border rounded-lg">
          <TableData name= {baceDetails.name} />
        </div>

      </div>

    </div>
  )

}


