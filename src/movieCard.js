import React from "react";

export default function ({ movie }) {
  return (
    <div className="card">
      <img
        className="card--image"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`
            : "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80"
        }
        alt={movie.title + " poster"}
      />
      <div className="card--content">
        <h3 className="card--title">
          {movie.title.length > 20 ? (
            <span>
              {movie.title.slice(0, 20)}
              ...
            </span>
          ) : (
            movie.title
          )}
        </h3>
        <p className="card--stat">
          <small>Release: {movie.release_date}</small>
          {"  "}
          <small>RATING: {movie.vote_average}</small>
        </p>
        <p className="card--desc">
          {movie.overview.length > 100 ? (
            <span>
              {movie.overview.slice(0, 100)}
              ...
            </span>
          ) : (
            movie.overview
          )}
        </p>
      </div>
    </div>
  );
}
