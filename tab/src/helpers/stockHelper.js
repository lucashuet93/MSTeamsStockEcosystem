import axios from 'axios'
import { AlphaVantageAPIKey } from '../assets/secrets'

export const getStockPrice = (symbol) => {
	let dailyTimeSeriesRoute = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=full&apikey=${AlphaVantageAPIKey}`
	return axios.get(dailyTimeSeriesRoute)	
}