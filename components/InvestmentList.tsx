import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Investment } from '@/types'

type InvestmentListProps = {
  investments: Investment[]
}

export default function InvestmentList({ investments }: InvestmentListProps) {
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
            <TableCell>{investment.principal.toFixed(2)}</TableCell>
            <TableCell>{investment.rate.toFixed(2)}%</TableCell>
            <TableCell>{investment.startDate.toLocaleDateString()}</TableCell>
            <TableCell>{investment.endDate.toLocaleDateString()}</TableCell>
            <TableCell>{investment.interestType}</TableCell>
            <TableCell>{investment.investmentType}</TableCell>
            <TableCell>{investment.expectedReturn.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}