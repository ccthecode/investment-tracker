export type Investment = {
  principal: number
  rate: number
  startDate: Date | undefined
  endDate: Date | undefined
  interestType: 'simple' | 'compound'
  investmentType: 'daily' | 'annually'
  expectedReturn: number
}