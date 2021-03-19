import * as ActionTypes from "./actionTypes";

const initialState = {
  data: [],
  page: 0,
  loading: false,
  hasMore: true,
  searched: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.init: {
      return {
        ...state,
        data: action.result,
        hasMore: action.hasMore,
      };
    }
    case ActionTypes.searchForMovie: {
      return {
        ...state,
        data: action.result,
        hasMore: action.hasMore,
      };
    }
    case ActionTypes.initPage: {
      return {
        ...state,
        page: 1,
      };
    }
    case ActionTypes.incrementPage: {
      return {
        ...state,
        page: state.page + 1,
      };
    }
    case ActionTypes.addElements: {
      const updatedState = {
        ...state,
        data: [...state.data, ...action.result],
        hasMore: action.hasMore,
      };
      return updatedState;
    }
    case ActionTypes.ToggleLoading: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case ActionTypes.toggleSearched: {
      return {
        ...state,
        searched: action.searched,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
