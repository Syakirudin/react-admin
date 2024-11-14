// src/pages/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f7fc] p-5">
      <h1 className="text-2xl text-[#333] mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-[#ddd] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-[#ddd] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-start gap-2">
          <a href="/forgot-password" className="text-blue-500 text-sm hover:underline">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>

        <div className="text-center">
          <span className="text-sm">Don't have an account? </span>
          <a href="/sign-up" className="text-blue-500 text-sm hover:underline">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
