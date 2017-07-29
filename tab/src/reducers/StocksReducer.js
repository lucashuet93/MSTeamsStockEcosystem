
import { LOAD_PORTFOLIO, UPDATE_STATISTICS, DELETE_STOCK, ADD_STOCK, UPDATE_STOCK, LOADED } from '../actions'

const initialState = {
    portfolio: null,
    statistics: null,
    prevDeletedCompany: null,
    prevUpdatedCompany: {
        company: null,
        newShares: null
    },
    initialLoad: false
};

const StocksReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOADED:
			return { ...state, initialLoad: true }
        case LOAD_PORTFOLIO:
			return { ...state, portfolio: action.portfolio }
        case UPDATE_STATISTICS:
			return { ...state, statistics: action.statistics }
        case DELETE_STOCK:
            return {...state, prevDeletedCompany: action.companyToDelete , portfolio: state.portfolio.filter(p => p.Company.toLowerCase() !== action.companyToDelete.toLowerCase())}
        case ADD_STOCK:
			return { ...state, portfolio: [...state.portfolio, action.stock] }
        case UPDATE_STOCK:
            let updated = state.portfolio.find(p => p.Company.toLowerCase() == action.companyToUpdate.toLowerCase())
            let newPortfolio = state.portfolio.filter(p => p.Company.toLowerCase() !== action.companyToUpdate.toLowerCase())
            updated.NumShares = action.newShares;
            newPortfolio.push(updated)
            let companyObj = {
                company: action.companyToUpdate,
                newShares: action.newShares
            }
			return { ...state, portfolio: newPortfolio, prevUpdatedCompany: companyObj }
        default:
            return state;
    }
}
export default StocksReducer;