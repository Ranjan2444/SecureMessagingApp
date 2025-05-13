import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState('');

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                username,
                password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            alert('Login Successful')
            
        } catch (err) {
            setError('Invalid username or password');
        }

    }


  return (
    <div className="p-4 max-w-sm mx-auto border rounded mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
