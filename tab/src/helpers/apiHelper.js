import axios from 'axios';

const rootAPIUrl = 'https://msteamsstockecosystemapi.azurewebsites.net/api/'
const config = {
	headers: { "Content-Type": "application/json" }
};

export const loginUser = (username, password) => {
	let route = rootAPIUrl.concat("loginUserFromTab")
	let body = {
		username: username
	}
	return axios.post(route, body, config)
}

export const createUser = (username, password, firstname, lastname) => {
	let route = rootAPIUrl.concat("createUser")
	let body = {
		username: username,
		password: password,
		firstname: firstname,
		lastname: lastname
	}
	return axios.post(route, body, config)
}

export const updateUserCapital = (userId, newAmount) => {
	let route = rootAPIUrl.concat("updateUserCapital")
	let body = {
		userId: userId,
		newAmount: newAmount
	}
	return axios.post(route, body, config)
}

export const sellAllShares = (userId, company) => {
	let route = rootAPIUrl.concat("sellAllShares")
	let body = {
		userId: userId,
		company: company,
	}
	return axios.post(route, body, config)
}

export const buyNewShares = (userId, company, numShares, sharePrice) => {
	let route = rootAPIUrl.concat("buyNewShares")
	let body = {
		userId: userId,
		company: company,
		numShares: numShares,
		sharePrice: sharePrice
	}
	return axios.post(route, body, config)
}

export const updateShares = (userId, company, numShares, sharePrice) => {
	let route = rootAPIUrl.concat("updateShares")
	let body = {
		userId: userId,
		company: company,
		numShares: numShares,
		sharePrice: sharePrice
	}
	return axios.post(route, body, config)
}

export const getPortfolio = (userId) => {
	let route = rootAPIUrl.concat("getPortfolio")
	let body = {
		userId: userId
	}
	return axios.post(route, body, config)
}