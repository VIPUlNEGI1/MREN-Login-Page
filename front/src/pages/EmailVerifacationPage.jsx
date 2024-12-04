import React, { useEffect, useRef, useState } from 'react'; // Importing necessary hooks from React
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import { motion } from 'framer-motion'; // Importing motion for animations
import { useAuthStore } from '../store/authStore'; // Importing useAuthStore
import { toast } from 'react-hot-toast'; // Importing toast for notifications

export default function EmailVerificationPage() { // Defining the EmailVerificationPage component

  const [code, setCode] = useState(["", "", "", "", "", ""]); // State to hold the 6-digit code
  const inputRef = useRef([]); // Ref to keep track of input elements
  const navigate = useNavigate(); // Hook for navigation
  const { error, isLoading, verifyEmail } = useAuthStore(); // Correcting the useAuthStore function call

  const handleChange = (index, value) => { // Function to handle changes in the input fields
    const newCode = [...code];

    if (value.length > 1) { // Handling pasted code
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== ""); // Find the last filled index
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5; // Determine the next focus index
      inputRef.current[focusIndex].focus(); // Set focus to the next input
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) { // Move focus to the next input
        inputRef.current[index + 1].focus();
      }
    }
  }

  const handleKeyDown = (index, e) => { // Handle key down events
    if (e.key === "Backspace" && !code[index] && index > 0) { // Handle backspace
      inputRef.current[index - 1].focus();
    }
  }

  const handleSubmit = async (e) => { // Handle form submission
    e.preventDefault();
    const verificationCode = code.join(""); // Join code array into a single string
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  }

  // Auto-submit when all digits are filled
  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      handleSubmit(new Event('submit'));
    }
  }, [code]);

  return (
    <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      {/* Container for the component */}
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animation state on render
        transition={{ duration: 0.5 }} // Duration of the animation
        className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl p-8 w-full max-w-md'
      >
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Verify Your Email
        </h2>

        <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your address.</p>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRef.current[index] = el)} // Assigning ref to input
                type='text'
                maxLength='6'
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)} // Handling input changes
                onKeyDown={(e) => handleKeyDown(index, e)} // Handling key down events
                className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
              />
            ))}
          </div>
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>} 
          {/* // Correcting the error message display logic */}
          <motion.button
            whileHover={{ scale: 1.05 }} // Hover animation
            whileTap={{ scale: 0.95 }} // Tap animation
            type='submit'
            disabled={isLoading || code.some((digit) => !digit)} // Disable button if loading or any digit is empty
            className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
          >
            {isLoading ? "Verifying..." : "Verify Email"} 
            {/* Button text changes based on loading state */}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
