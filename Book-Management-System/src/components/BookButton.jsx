import { Link } from "react-router-dom"

export default function BookButton({ title, color, link }) {
  return (
    <Link to={link} >
    <button className=" 
               text-white 
                m-2
                w-full
               p-2
               h-fit 
               rounded-lg 
               font-medium 
               shadow-md 
               hover:brightness-110 
               active:scale-95 
               transition-all duration-200" style={{ background: color }}>
      {title}
    </button></Link>
  )
}