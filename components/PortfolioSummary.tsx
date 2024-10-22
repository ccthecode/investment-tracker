import { Investment } from '@/types'

export default function PortfolioSummary({ investments }: { investments: Investment[] }) {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalProfitLoss = totalCurrentValue - totalInvested

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <p className="mb-2">
        <span className="font-semibold">Total Invested:</span> ${totalInvested.toFixed(2)}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Current Portfolio Value:</span> ${totalCurrentValue.toFixed(2)}
      </p>
      <p className={`font-semibold ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        Total Profit/Loss: ${totalProfitLoss.toFixed(2)}
      </p>
    </div>
  )
}