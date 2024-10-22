'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, RotateCwIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Investment } from '@/types'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

type AddInvestmentFormProps = {
  onAddInvestment: (investment: Investment) => void
}

export default function AddInvestmentForm({ onAddInvestment }: AddInvestmentFormProps) {
  const { toast } = useToast()

  // const [toastMessage, setToast]
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  // const [interestType, setInterestType] = useState('compound')
  // const [investmentType, setInvestmentType] = useState('annually')
  const [interestType, setInterestType] = useState<'simple' | 'compound'>('compound');
  const [investmentType, setInvestmentType] = useState<'daily' | 'annually'>('annually')

  const calculateReturn = () => {
    if (!startDate || !endDate) return '0.00'
    const principalAmount = parseFloat(principal)
    const ratePercentage = parseFloat(rate) / 100
    const maturityDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    let expectedReturn

    if (investmentType === 'annually') {
      if (interestType === 'compound') {
        expectedReturn = principalAmount * Math.pow(1 + ratePercentage, maturityDays / 365) - principalAmount
      } else {
        expectedReturn = principalAmount * ratePercentage * (maturityDays / 365)
      }
    } else {
      if (interestType === 'compound') {
        expectedReturn = principalAmount * Math.pow(1 + ratePercentage, maturityDays) - principalAmount
      } else {
        expectedReturn = principalAmount * ratePercentage * (maturityDays)
      }
    }

    return expectedReturn.toFixed(2)
  }

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!startDate || !endDate) return
    const newInvestment: Investment = {
      principal: parseFloat(principal),
      rate: parseFloat(rate),
      startDate,
      endDate,
      interestType,
      investmentType,
      expectedReturn: parseFloat(calculateReturn())
    }
    onAddInvestment(newInvestment)

    toast({
      title: `At maturity, (${endDate.toLocaleDateString()}), you would have made: ${calculateReturn()}`,
      description: `See full breakdown at the bottom of the page`,
    })
  }

  const resetInputFields = () => {
    setPrincipal('')
    setRate('')
    setStartDate(undefined)
    setEndDate(undefined)
    setInterestType('compound')
    setInvestmentType('annually')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Toaster/>
      <div>
        <Label htmlFor="principal">Principal Amount</Label>
        <Input
          id="principal"
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="rate">Interest Rate (%)</Label>
        <Input
          id="rate"
          type="number"
          step="0.01"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
        />
      </div>
      <RadioGroup value={investmentType} onValueChange={(value)=>setInvestmentType(value as 'daily' | 'annually')}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="daily" id="daily" />
          <Label htmlFor="daily">Daily</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="annually" id="annually" />
          <Label htmlFor="annually">Annually</Label>
        </div>
      </RadioGroup>
      <div className="sm:flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex-1">
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <RadioGroup value={interestType} onValueChange={(value)=>setInterestType(value as 'simple' | 'compound')}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compound" id="compound" />
          <Label htmlFor="compound">Compound Interest</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="simple" id="simple" />
          <Label htmlFor="simple">Simple Interest</Label>
        </div>
      </RadioGroup>
      <div className="flex align-middle gap-4">
        <Button  className='bg-green-600 hover:bg-green-500' type="submit">Add Investment</Button>
        <Button variant={'default'} onClick={resetInputFields} type="reset">
          <RotateCwIcon className="mr-2 h-4 w-4" />
          <span>Clear Inputs</span>  
        </Button>
      </div>
    </form>
  )
}