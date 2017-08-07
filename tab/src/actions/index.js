
export const LOAD_USER = 'LOAD-USER';
export const loadUser = (user) => {
	return {
		type: LOAD_USER,
		user: user
	}
}

export const UPDATE_USER_CAPITAL = 'UPDATE_STATISTICS'
export const updateCapital = (capital) => {
	return {
		type: UPDATE_USER_CAPITAL,
		capital: capital
	}
}

export const LOAD_PORTFOLIO = 'LOAD_PORTFOLIO'
export const loadPortfolio = (portfolio) => {
	return {
		type: LOAD_PORTFOLIO,
		portfolio: portfolio
	}
}

export const LOAD_CONTEXT = 'LOAD_CONTEXT'
export const loadContext = (context) => {
	return {
		type: LOAD_CONTEXT,
		context: context
	}
}

export const UPDATE_STATISTICS = 'UPDATE_STATISTICS'
export const updateStatistics = (statistics) => {
	return {
		type: UPDATE_STATISTICS,
		statistics: statistics
	}
}

export const ADD_STOCK = 'ADD_STOCK'
export const addStock = (stock) => {
	return {
		type: ADD_STOCK,
		stock: stock
	}
}

export const DELETE_STOCK = 'DELETE_STOCK'
export const deleteStock = (company) => {
	return {
		type: DELETE_STOCK,
		companyToDelete: company
	}
}

export const UPDATE_STOCK = 'UPDATE_STOCK'
export const updateStock = (company, numShares) => {
	return {
		type: UPDATE_STOCK,
		companyToUpdate: company,
		newShares: numShares,
	}
}

export const LOADED = 'LOADED'
export const initialLoad = () => {
	return {
		type: LOADED,
	}
}