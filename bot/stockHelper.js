
let axios = require('axios')
const getStockPrice = (symbol) => {
	let dailyTimeSeriesRoute = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=full&apikey=${process.env.AlphaVantageAPIKey}`
	return axios.get(dailyTimeSeriesRoute)	
}

module.exports = {
	getStockPrice: getStockPrice
}