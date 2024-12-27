import { GameReducer } from './reducer.ts';
import { createStore } from 'redux';

export const store = createStore(GameReducer);
