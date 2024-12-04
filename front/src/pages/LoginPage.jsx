import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const { login, isLoading, error } = useAuthStore(); // Ensure hook is invoked

    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-blue-200">Welcome Back</h2>
                    <form onSubmit={handleLogin}>
                        <div className="relative mb-4">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="relative mb-6">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="flex items-center mb-6">
                            <Link to='/forgot-password' className='text-sm text-blue-400 hover:underline'>Forget Password</Link>
                        </div>
                        {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold rounded-lg hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        >
                            {isLoading ? <Loader className='w-6 h-6 animate-spin text-center mx-auto' /> : "Login"}
                        </motion.button>
                        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                            <p className='text-sm text-gray-400'>Don't have an account? {""}
                                <Link to='/signup' className='text-blue-400 hover:underline'>Signup</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default LoginPage;
