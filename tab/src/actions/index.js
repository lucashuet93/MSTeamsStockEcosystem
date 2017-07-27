
export const LOAD_USER = 'LOAD-USER';
export const loadUser = (user) => {
	return {
		type: LOAD_USER,
		user: user
	}
}

export const LOAD_PORTFOLIO = 'LOAD_PORTFOLIO'
export const loadPortfolio = (portfolio) => {
	return {
		type: LOAD_PORTFOLIO,
		portfolio: portfolio
	}
}

export const UPDATE_STATISTICS = 'UPDATE_STATISTICS'
export const updateStatistics = (statistics) => {
	return {
		type: UPDATE_STATISTICS,
		statistics: statistics
	}
}