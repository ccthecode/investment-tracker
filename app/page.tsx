'use client'

import { useState } from 'react'
import AddInvestmentForm from '@/components/AddInvestmentForm'
import InvestmentList from '@/components/InvestmentList'
import { Investment } from '@/types'
import { Github } from 'lucide-react'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'

export default function Home() {
  const [investments, setInvestments] = useState<Investment[]>([])

  const addInvestment = (investment: Investment) => {
    setInvestments([...investments, investment])
  }

  const handleDeleteInvestment = (index: number) => {
    setInvestments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <main className="container mx-auto">
        <Nav/>
        <div className='mb-8 max-w-lg'>
          <p>Calculate and track your investments, supporting both simple and compound interest calculations.</p>
        </div>
        <AddInvestmentForm onAddInvestment={addInvestment} />    
        <InvestmentList investments={investments} onDeleteInvestment={handleDeleteInvestment} />
      </main>
      <Footer/>
    </div>
  )
}