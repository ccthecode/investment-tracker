export type Investment = {
  principal: number
  rate: number
  startDate?: Date
  endDate?: Date
  interestType: 'simple' | 'compound'
  investmentType: 'daily' | 'annually'
  expectedReturn: number
  currency: string
}