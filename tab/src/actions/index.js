
export const LOAD_USER = 'LOAD-USER';
export const LOAD_PORTFOLIO = 'LOAD_PORTFOLIO'

export const loadUser = (user) => {
	return {
		type: LOAD_USER,
		user: user
	}
}

export const loadPortfolio = (portfolio) => {
	return {
		type: LOAD_PORTFOLIO,
		portfolio: portfolio
	}
}