let secrets = require('./secrets');
let axios = require('axios')
const getStockPrice = (symbol) => {
	let dailyTimeSeriesRoute = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=full&apikey=${secrets.AlphaVantageAPIKey}`
	axios.get(dailyTimeSeriesRoute)
		.then((res) => {
			return res.data['Time Series (1min)']
		})
}

module.exports = {
	getStockPrice: getStockPrice
}