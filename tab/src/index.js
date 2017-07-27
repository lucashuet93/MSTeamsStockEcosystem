import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root';

ReactDOM.render(
    <Provider store={createStore(rootReducer)}>
        <App />
    </Provider>,
  document.getElementById('root'));