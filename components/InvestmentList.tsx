import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Investment } from '@/types'
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { differenceInDays } from 'date-fns'

type InvestmentListProps = {
  investments: Investment[]
  onDeleteInvestment: (index: number) => void
}

export default function InvestmentList({ investments, onDeleteInvestment }: InvestmentListProps) {
  const calculateDays = (startDate: Date | undefined, endDate: Date | undefined) => {
    if (startDate && endDate) {
      return differenceInDays(endDate, startDate)
    }
    return 365 // Default to 365 days if dates are not provided
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Principal</TableHead>
          <TableHead>Rate (%)</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Days</TableHead>
          <TableHead>Interest Type</TableHead>
          <TableHead>Investment Type</TableHead>
          <TableHead>Expected Return</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investments.map((investment, index) => (
          <TableRow key={index}>
            <TableCell>{investment.principal.toLocaleString()}</TableCell>
            <TableCell>{investment.rate.toFixed(2)}%</TableCell>
            <TableCell>{investment.startDate?.toLocaleDateString()}</TableCell>
            <TableCell>{investment.endDate?.toLocaleDateString()}</TableCell>
            <TableCell>{calculateDays(investment.startDate, investment.endDate)}</TableCell>
            <TableCell>{investment.interestType}</TableCell>
            <TableCell>{investment.investmentType}</TableCell>
            <TableCell>{investment.expectedReturn.toLocaleString()}</TableCell>
            <TableCell>
              <Button 
                variant="destructive"
                onClick={() => onDeleteInvestment(index)}
                className="w-8 h-8 p-0"
              >
                <X size={16} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}