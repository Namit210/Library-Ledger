import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function BaceInfo() {
    const [baceIds, setBaceIds] = useState([]);
    useEffect(
        ()=>{
            fetch('http://localhost:4000/bace/all')
            .then(response => response.json())
            .then(data => {
                const ids = data.map(bace => bace._id);
                setBaceIds(ids);
            })
            .catch(error => console.error("Error fetching BACE data:", error));
        }
        ,[]
    )
    

    return (
        <div>
            <h1 className="text-2xl font-bold m-4">BACEs Information</h1>
            {baceIds.map(id => 
                <BaceSlip id={id} key={id}/>
            )}
            
            
        </div>
    
    )

}

function BaceSlip({id}){

    const [baceData, setBaceData] = useState({});

    useEffect(
        ()=>{
            fetch(`http://localhost:4000/bace/get-details/${id}`)
            .then(response => response.json())
            .then(data => {
                setBaceData(data);
            })
            .catch(error => console.error("Error fetching BACE data:", error));
        },[]
    )

    const handleClick = () => {
        window.location.href = `/bacehome/${baceData._id}`;
    }
    return(
        <div className="bg-white p-4 rounded-lg shadow-md m-2 hover:shadow-lg transition-shadow duration-300" onClick={handleClick}>
                <p><span className="font-medium">BACE Name: </span> {baceData.name}</p>
                <p><span className="font-medium">Small Books: </span> {baceData.small_books}</p>
                <p><span className="font-medium">Big Books: </span>{baceData.big_books}</p>
                <p><span className="font-medium">MahaBig Books: </span>{baceData.mahabig_books}</p>
                <p><span className="font-medium">Total Books: </span>{baceData.total_books}</p>
                <p><span className="font-medium">Created at: </span>{ new Date(baceData.createdAt).toDateString()}</p>
        </div>
    )
}