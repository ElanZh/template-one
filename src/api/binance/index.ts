import { request } from "@/utils/service"
import type * as Binance from "./types/binance"

/** 现货历史成交 */
export function spotHistoryTradeApi(params: Binance.HistoryTradeRequest) {
  return request<Binance.HistoryTradeData[]>({
    url: "binance/spot/historicalTrades",
    method: "get",
    params
  })
}

/** 合约历史成交 */
export function futureHistoryTradeApi(params: Binance.HistoryTradeRequest) {
  return request<Binance.HistoryTradeData[]>({
    url: "binance/futures/historicalTrades",
    method: "get",
    params
  })
}
