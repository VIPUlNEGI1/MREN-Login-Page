import React from 'react'
import { motion } from 'framer-motion'
function LoadingSpiner() {
  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
    <motion.div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
    animate={{rotate:360}}
    transition={{duration:1, repeat: Infinity, ease:"linear"}}
    />
   </div>
  )
}

export default LoadingSpiner