import NavBar from "./components/NavBar"
import Store from "./pages/StoreHome"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage  from "./pages/LoginPage"
import AdminHome from "./pages/AdminHome"
import Register from "./pages/Register"
import StoreInfo from "./pages/StoreInfo"
import { Logout } from "./pages/Logout"

function App() {

  return (
    <>
    <Router>
    <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/storehome/:id" element={<Store />} />
        <Route path="/admin/dashboard" element={<AdminHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/sinfo" element={<StoreInfo />} />

        <Route path="*" element={<h1 className="text-center text-2xl mt-10">404 Not Found</h1>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
