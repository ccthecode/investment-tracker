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

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Investment Tracker</h1>
      <AddInvestmentForm onAddInvestment={addInvestment} />
      <InvestmentList investments={investments} />
    </main>
  )
}