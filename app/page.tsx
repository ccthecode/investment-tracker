'use client'

import { useState } from 'react'
import AddInvestmentForm from '@/components/AddInvestmentForm'
import InvestmentList from '@/components/InvestmentList'
import { Investment } from '@/types'

export default function Home() {
  const [investments, setInvestments] = useState<Investment[]>([])

  const addInvestment = (investment: Investment) => {
    setInvestments([...investments, investment])
  }

  const handleDeleteInvestment = (index: number) => {
    setInvestments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <div className='mb-8 max-w-lg'>
        <h1 className="text-3xl font-bold mb-4">Investment Tracker</h1>
        <p>Calculate and track your investments, supporting both simple and compound interest calculations.</p>
      </div>
      <AddInvestmentForm onAddInvestment={addInvestment} />    
      <InvestmentList investments={investments} onDeleteInvestment={handleDeleteInvestment} />
    </main>
  )
}