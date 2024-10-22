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
import { X } from 'lucide-react';

type InvestmentListProps = {
  investments: Investment[]
  onDeleteInvestment: (index: number) => void // Function to handle delete
}

const handleDeleteInvestment = (index: number) => {
  setInvestments((prev) => prev.filter((_: any, i: number) => i !== index));
};

export default function InvestmentList({ investments, onDeleteInvestment }: InvestmentListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Principal</TableHead>
          <TableHead>Rate (%)</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Interest Type</TableHead>
          <TableHead>Investment Type</TableHead>
          <TableHead>Expected Return</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investments.map((investment, index) => (
          <TableRow key={index}>
            <TableCell>{investment.principal.toLocaleString()}</TableCell>
            <TableCell>{investment.rate.toFixed(2)}%</TableCell>
            <TableCell>{investment.startDate.toLocaleDateString()}</TableCell>
            <TableCell>{investment.endDate.toLocaleDateString()}</TableCell>
            <TableCell>{investment.interestType}</TableCell>
            <TableCell>{investment.investmentType}</TableCell>
            <TableCell>{investment.expectedReturn.toLocaleString()}</TableCell>
            <TableCell>
            <Button 
            variant={"destructive"}
                onClick={() => onDeleteInvestment(index)} // Call delete function with index
                className="w-1"
              >
                <X/>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function setInvestments(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.")
}
