import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function StoreInfo() {
    const [storeIds, setStoreIds] = useState([]);
    useEffect(
        ()=>{
            fetch(`${API_BASE_URL}/store/all`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => response.json())
            .then(data => {
                const ids = data.map(store => store._id);
                setStoreIds(ids);
            })
            .catch(error => console.error("Error fetching Store data:", error));
        }
        ,[]
    );
    

    return (
        <div>
            <h1 className="text-2xl font-bold m-4 font-lato">Stores Information</h1>
            {storeIds.map(id => 
                <StoreSlip id={id} key={id}/>
            )}
            
            
        </div>
    
    )

}

function StoreSlip({id}){

    const [storeData, setStoreData] = useState({});

    useEffect(
        ()=>{
            fetch(`${API_BASE_URL}/store/get-details/${id}`)
            .then(response => response.json())
            .then(data => {
                setStoreData(data);
            })
            .catch(error => console.error("Error fetching Store data:", error));
        },[]
    )

    const handleClick = () => {
        window.location.href = `/storehome/${storeData._id}`;
    }
    return(
        <div className="bg-white font-lato p-4 rounded-lg shadow-md m-2 hover:shadow-lg transition-shadow duration-300" onClick={handleClick}>
                <p><span className="font-bold">Store Name: </span> {storeData.name}</p>
                <p><span className="font-bold">Small Books: </span> {storeData.small_books}</p>
                <p><span className="font-bold">Medium Books: </span>{storeData.medium_books}</p>
                <p><span className="font-bold">Big Books: </span>{storeData.big_books}</p>
                <p><span className="font-bold">Total Books: </span>{storeData.total_books}</p>
                <p><span className="font-bold">Created at: </span>{ new Date(storeData.createdAt).toDateString()}</p>
        </div>
    )
}