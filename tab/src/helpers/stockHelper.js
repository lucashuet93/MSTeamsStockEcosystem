import axios from 'axios'
import { AlphaVantageAPIKey } from '../assets/secrets'

export const getMinuteTimeSeries = (symbol) => {
	let minuteTimeSeriesRoute = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=full&apikey=${AlphaVantageAPIKey}`
	return axios.get(minuteTimeSeriesRoute)	
}

export const getDailyTimeSeries = (symbol) => {
	let dailyTimeSeriesRoute = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${AlphaVantageAPIKey}`
	return axios.get(dailyTimeSeriesRoute)	
}

export const getMonthlyTimeSeries = (symbol) => {
	let monthlyTimeSeriesRoute = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${AlphaVantageAPIKey}`
	return axios.get(monthlyTimeSeriesRoute)	
}