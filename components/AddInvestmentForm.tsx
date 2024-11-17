'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, differenceInDays, addDays } from "date-fns"
import { CalendarIcon, RotateCwIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Investment } from '@/types'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

type AddInvestmentFormProps = {
  onAddInvestment: (investment: Investment) => void
}

type Currency = {
  code: string
  name: string
  flag: string
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
]

export default function AddInvestmentForm({ onAddInvestment }: AddInvestmentFormProps) {
  const { toast } = useToast()

  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 365))
  const [interestType, setInterestType] = useState<'simple' | 'compound'>('compound')
  const [investmentType, setInvestmentType] = useState<'daily' | 'annually'>('annually')
  const [currency, setCurrency] = useState<Currency>(currencies[0])

  useEffect(() => {
    if (investmentType === 'annually') {
      setEndDate(addDays(startDate || new Date(), 365))
    }
  }, [investmentType, startDate])

  const calculateReturn = () => {
    const principalAmount = parseFloat(principal)
    const ratePercentage = parseFloat(rate) / 100
    const maturityDays = differenceInDays(endDate, startDate)
    const years = maturityDays / 365

    let expectedReturn: number

    if (investmentType === 'annually') {
      if (interestType === 'compound') {
        expectedReturn = principalAmount * Math.pow(1 + ratePercentage, years) - principalAmount
      } else {
        expectedReturn = principalAmount * ratePercentage * years
      }
    } else {
      if (interestType === 'compound') {
        expectedReturn = principalAmount * Math.pow(1 + ratePercentage, maturityDays) - principalAmount
      } else {
        expectedReturn = principalAmount * ratePercentage * maturityDays
      }
    }
    
    return expectedReturn.toFixed(2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newInvestment: Investment = {
      principal: parseFloat(principal),
      rate: parseFloat(rate),
      startDate,
      endDate,
      interestType,
      investmentType,
      expectedReturn: parseFloat(calculateReturn()),
      currency: currency.code,
    }
    onAddInvestment(newInvestment)

    toast({
      title: `Investment Added`,
      description: `At maturity (${format(endDate, 'PP')}), you would have made: ${currency.flag} ${currency.code} ${parseFloat(calculateReturn()).toLocaleString()}`,
    })
  }

  const resetInputFields = () => {
    setPrincipal('')
    setRate('')
    setStartDate(new Date())
    setEndDate(addDays(new Date(), 365))
    setInterestType('compound')
    setInvestmentType('annually')
    setCurrency(currencies[0])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Toaster/>
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="principal">Principal Amount</Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            required
          />
        </div>
        <div className="w-40">
          <Label htmlFor="currency">Currency</Label>
          <Select value={currency.code} onValueChange={(value) => setCurrency(currencies.find(c => c.code === value) || currencies[0])}>
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  <span className="flex items-center">
                    <span className="mr-2">{c.flag}</span>
                    {c.code} - {c.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
      <RadioGroup value={investmentType} onValueChange={(value) => {
        setInvestmentType(value as 'daily' | 'annually')
      }}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="daily" id="daily" />
          <Label htmlFor="daily">Daily</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="annually" id="annually" />
          <Label htmlFor="annually">Annually (365 days)</Label>
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
                {format(startDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => setStartDate(date || new Date())}
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
                {format(endDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => setEndDate(date || addDays(new Date(), 365))}
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
        <Button className='bg-green-600 hover:bg-green-500' type="submit">Add Investment</Button>
        <Button variant={'default'} onClick={resetInputFields} type="reset">
          <RotateCwIcon className="mr-2 h-4 w-4" />
          <span>Reset Inputs</span>  
        </Button>
      </div>
    </form>
  )
}