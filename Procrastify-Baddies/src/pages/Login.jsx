import { useState } from 'react';
import { login } from '../services/api.js'; // 1. Import login

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userData = { email, password };
      const data = await login(userData); // 2. Call login
      
      console.log('Login successful, token:', data.token);
      alert('Login successful!');
      // We will save the token and redirect in the next step

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        Login to Your Account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;