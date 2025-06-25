import Button from '@/components/CustomButton'
import React from 'react'

const WelcomeBanner = () => {
  return (
    <div
    className="p-5 rounded-xl bg-gradient-to-r from-[#bdc3c7] to-[#2c3e50]"
  >
        <div className='text-white'>
            <h1 className='text-3xl font-bold mb-2'>Welcome to Careerly.Ai!</h1>
            <p className='text-lg mb-6'>
                Your AI-powered career assistant. Let's get started on your journey to success! 
                Unlock personalized guidance, smart tools, and expert resources to help you achieve your professional goals faster and more efficiently.
                </p>
            <Button>
                Get Started
            </Button>
        </div>
    </div>
  )
}

export default WelcomeBanner