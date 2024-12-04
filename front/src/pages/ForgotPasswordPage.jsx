import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Mail, ArrowLeft } from 'lucide-react'; // Ensure correct import for icons
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
   // Corrected to isSubmitted

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center ">
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Corrected to initial
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
      >
        <div className="p-8">
          <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
            Forgot Password
          </h2>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <p className="text-gray-300 mb-6 text-center">
                Enter your email address, Buddy!
              </p>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400"/>
                <input
                  type='email'
                  placeholder='Enter email, Buddy!'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='pl-10 pr-4 py-3 w-full bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }} // Hover animation
                whileTap={{ scale: 0.98 }} // Tap animation
                type='submit'
                className='w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
              >
                {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }} // Corrected to initial
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>
              <p className='text-gray-300 mb-6'>
                If an account exists for {email}, you will receive a password reset link shortly.
              </p>
            </div>
          )}
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <Link to={"/login"} className="text-sm text-green-400 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPasswordPage;
