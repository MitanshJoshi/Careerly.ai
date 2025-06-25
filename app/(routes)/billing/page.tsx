import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Billing = () => {
  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold mb-4'>Billing Information</h1>
      <p className='text-gray-600 mb-6'>Manage your subscription and payment details here.</p>
        <PricingTable/>
    </div>
  )
} 

export default Billing