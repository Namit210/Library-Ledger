import { useState } from "react";

export default function Register(){

    const [baceName, setBaceName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match!");
            return;
        }

        
        // Send registration data to backend API
        fetch('http://localhost:4000/bace/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: baceName, password }),
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                alert("Registration successful!");
                // Optionally, redirect to login page or home page
            } else {
                alert("Registration failed: " + data.message);
            }
        })
        .catch(error => console.error("Error during registration:", error));
    }   

    return (
         <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">BACE Register</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">BACE Name</label>
                        <input type="text" id="bacename" name="bacename" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setBaceName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Set Password</label>
                        <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" id="cnf-password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}