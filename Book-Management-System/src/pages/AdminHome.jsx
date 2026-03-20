// import { Link } from "react-router-dom";
import BookButton from "../components/BookButton";
import Card from "../components/Card";
import TableData from "../components/TableData";
import Allot from "../components/Allot";
import { useState } from "react";

export default function AdminHome() {
  const [allotVisible, setAllotVisible] = useState(false);

  return (
    <div>

      <div className="flex justify-between flex-wrap px-6 hareKrsnaitems-center">
        <Card title={'Admin'} desc={''} bg={'oklch(79.5% 0.184 86.047) '} />
        <div className="flex flex-wrap items-center justify-center">
        <Card title={'Instock'} desc={200} bg={'oklch(64.8% 0.2 131.684)'} />
        <Card title={'This month Score'} desc={140} bg={'oklch(43.2% 0.232 292.759)'} />

        <div className="flex flex-col items-center justify-center">

          <div onClick={
            ()=>{
              setAllotVisible(true);              
            }
          }>
          < BookButton title={'Allot Books'} color={'oklch(64.8% 0.2 131.684)'} />
          </div>
          < BookButton title={'Get BACE info'} color={'oklch(70.7% 0.165 254.624)'}  link={'/binfo'}/>
        </div>

      </div>

      </div>
      
      <div className="m-2">
        <div className="m-2 text-2xl ">Transaction History</div>

        <div className="max-h-[70vh] overflow-y-auto border rounded-lg">
          <TableData name='Admin' />
        </div>

      </div>

      <Allot isOpen={allotVisible}
      onClose={()=>setAllotVisible(false)}/>

    </div>
  )

}
