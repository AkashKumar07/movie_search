import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "./assets/pacman.svg";

export default function () {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=6387ef21dc196070b8bf74183b7fc49d`;
    (async function () {
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setData(data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="center">
      {!loading && data ? (
        <>
          <div className="movie">
            <div className="movie_poster">
              <img
                src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data.poster_path}`
                    : "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=715&q=80"
                }
              />
            </div>
            <div className="movie_details">
              <h3>
                {data.original_title}{" "}
                <span>({data.release_date.slice(0, 4)})</span>
              </h3>
              <p className="movie_details-info">
                <span>{data.release_date}</span>
                <span className="dot"></span>
                <span>
                  {data.genres.map((genre, index) =>
                    index + 1 === data.genres.length
                      ? genre.name
                      : genre.name + ", "
                  )}
                </span>
                <span className="dot"></span>
                <span>{data.runtime}mins</span>
              </p>
              <h4 className="movie_details-overview">overview</h4>
              <p>{data.overview}</p>
            </div>
          </div>
        </>
      ) : (
        <img className="loader__movieDetails" src={Loader} alt="loader" />
      )}
    </div>
  );
}
