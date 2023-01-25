import { createContext, useReducer } from 'react';

export const ACTIONS = {
  NEW_SEARCH: 'search new hotel',
  RESET_SEARCH: 'reset search'
};

const INITIAL_STATE = {
  city: undefined,
  date: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined
  }
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.NEW_SEARCH:
      return action.payload;
    case ACTIONS.RESET_SEARCH:
      return INITIAL_STATE;
    default:
      return state;
  }
};
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
