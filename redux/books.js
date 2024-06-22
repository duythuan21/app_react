import * as ActionTypes from './ActionTypes';

export const books = (state = { isLoading: true, errMess: null, books: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return { ...state, isLoading: false, errMess: null, books: action.payload };
    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, books: [] }
    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};