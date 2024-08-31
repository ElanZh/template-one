export interface HistoryTradeData {
  id: string
  price: string
  qty: string
  quoteQty: string
  time: string
  isBuyerMaker: boolean
  isBestMatch: boolean
}

export interface HistoryTradeRequest {
  symbol: string
  // 以 tradeId 为中心
  tradeId: string
  // 向前查询多少条
  forward: number
  // 向后查询多少条
  behind: number
}
