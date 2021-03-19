import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "./assets/pacman.svg";
import * as actions from "./store/action";
import MovieCard from "./movieCard";

export default function () {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const movies = useSelector((state) => state.data);
  const page = useSelector((state) => state.page);
  const loading = useSelector((state) => state.loading);
  const HasMore = useSelector((state) => state.hasMore);
  const searched = useSelector((state) => state.searched);

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && HasMore) {
            dispatch(actions.incrementPage());
          }
        },
        { threshold: 0.5 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, HasMore]
  );

  useEffect(() => {
    dispatch(actions.init(1));
  }, []);

  useEffect(() => {
    if (page > 1) {
      dispatch(actions.addElements(query, page));
    }
  }, [page]);

  const searchMovies = async (event) => {
    event.preventDefault();
    dispatch(actions.initPage);
    if (query.length === 0) {
      dispatch(actions.init(1));
    } else {
      dispatch(actions.searchForMovie(query, 1));
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Avengers"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <input type="submit" className="button" value="Search" />
      </form>
      <h4 className="res_title">
        {searched ? "Related Search Results" : "Trending Today"}
      </h4>
      <div className="card-list">
        {movies.length > 0 &&
          movies.map((movie, index) =>
            index + 1 === movies.length ? (
              <div ref={lastMovieElementRef} key={index}>
                <Link to={`/movie/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              </div>
            ) : (
              <div key={index}>
                <Link to={`/movie/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              </div>
            )
          )}
      </div>
      {loading ? (
        <div className="loading">
          <img src={Loader} alt="loader" />
        </div>
      ) : null}
    </>
  );
}
