let axios = require('axios')

const rootAPIUrl = 'https://msteamsstockecosystemapi.azurewebsites.net/api/'
const config = {
	headers: { "Content-Type": "application/json" }
};

const loginUser = (username, password) => {
	let route = rootAPIUrl.concat("loginUser")
	let body = {
		username: username,
		password: password
	}
	axios.post(route, body, config)
}

const createUser = (username, password, firstname, lastname) => {
	let route = rootAPIUrl.concat("createUser")
	let body = {
		username: username,
		password: password,
		firstname: firstname,
		lastname: lastname
	}
	axios.post(route, body, config)
}

const updateUserCapital = (userId, newAmount) => {
	let route = rootAPIUrl.concat("updateUserCapital")
	let body = {
		userId: userId,
		newAmount: newAmount
	}
	axios.post(route, body, config)
}

const sellAllShares = (userId, company) => {
	let route = rootAPIUrl.concat("sellAllShares")
	let body = {
		userId: userId,
		company: company,
	}
	axios.post(route, body, config)
}

const buyNewShares = (userId, company, numShares, sharePrice) => {
	let route = rootAPIUrl.concat("buyNewShares")
	let body = {
		userId: userId,
		company: company,
		numShares: numShares,
		sharePrice: sharePrice
	}
	axios.post(route, body, config)
}

const updateShares = (userId, company, numShares, sharePrice) => {
	let route = rootAPIUrl.concat("updateShares")
	let body = {
		userId: userId,
		company: company,
		numShares: numShares,
		sharePrice: sharePrice
	}
	axios.post(route, body, config)
}

const getPortfolio = (userId) => {
	let route = rootAPIUrl.concat("getPortfolio")
	let body = {
		userId: userId
	}
	axios.post(route, body, config)
}

module.exports = {

}