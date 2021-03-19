import * as actionTypes from "./actionTypes";

export const init = (page) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ToggleLoading,
    });
    dispatch({
      type: actionTypes.toggleSearched,
      searched: false,
    });
    dispatch({ type: actionTypes.initPage });
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=6387ef21dc196070b8bf74183b7fc49d&page=${page}`
    );
    const data = await res.json();
    dispatch({
      type: actionTypes.init,
      result: data.results,
      hasMore: page < data.total_pages,
    });
    dispatch({
      type: actionTypes.ToggleLoading,
    });
  };
};

export const initPage = () => {
  return {
    type: actionTypes.initPage,
  };
};

export const incrementPage = () => {
  return {
    type: actionTypes.incrementPage,
  };
};

export const toggleLoading = () => {
  return {
    type: actionTypes.ToggleLoading,
  };
};

export const searchForMovie = (term, page) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ToggleLoading,
    });
    dispatch({
      type: actionTypes.toggleSearched,
      searched: true,
    });
    dispatch({ type: actionTypes.initPage });
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=6387ef21dc196070b8bf74183b7fc49d&query=${term}&page=${page}`
    );
    const data = await res.json();
    console.log(data);
    dispatch({
      type: actionTypes.ToggleLoading,
    });
    dispatch({
      type: actionTypes.searchForMovie,
      result: data.results,
      hasMore: page < data.total_pages,
    });
  };
};

export const addElements = (term, page) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.ToggleLoading,
    });
    if (term.length === 0) {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=6387ef21dc196070b8bf74183b7fc49d&page=${page}`
      );
      const data = await res.json();
      dispatch({
        type: actionTypes.addElements,
        result: data.results,
        hasMore: page < data.total_pages,
      });
    } else {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=6387ef21dc196070b8bf74183b7fc49d&query=${term}&page=${page}`
      );
      const data = await res.json();
      dispatch({
        type: actionTypes.addElements,
        result: data.results,
        hasMore: page < data.total_pages,
      });
    }
    dispatch({
      type: actionTypes.ToggleLoading,
    });
  };
};
