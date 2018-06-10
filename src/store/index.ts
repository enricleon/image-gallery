import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { State, reducer } from '../reducers';
import { Action } from '../actions/images';

const store = createStore<State, Action, any, any>(reducer, applyMiddleware(logger, thunk));

export default store;