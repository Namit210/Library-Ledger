import NavBar from "./components/NavBar"
import Bace from "./pages/BaceHome"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage ,{ AdminLoginPage, BaceLoginPage } from "./pages/LoginPage"
import AdminHome from "./pages/AdminHome"
import Register from "./pages/Register"
import TrDetail from "./pages/TrDetail"
import BaceInfo from "./pages/BaceInfo"

function App() {

  return (
    <>
    <Router>
    <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/bacehome/:id" element={<Bace />} />
        <Route path="/admin/dashboard" element={<AdminHome />} />
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/login/bace" element={<BaceLoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tx" element={<TrDetail />} />
        <Route path="/binfo" element={<BaceInfo />} />

        <Route path="*" element={<h1 className="text-center text-2xl mt-10">404 Not Found</h1>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
