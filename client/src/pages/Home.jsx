import React, { useEffect, useState } from "react";
import axios from "axios";

// Dummy sections with basic rendering for demo purposes
const HeroSection = ({ movies }) => (
  <section>
    <h2>Hero Section</h2>
    <div style={{ display: "flex", gap: "10px" }}>
      {movies.slice(0, 1).map((movie) => (
        <div key={movie._id}>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  </section>
);

const FeaturedSection = ({ movies }) => (
  <section>
    <h2>Featured Movies</h2>
    <div style={{ display: "flex", gap: "10px" }}>
      {movies.slice(1, 5).map((movie) => (
        <div key={movie._id}>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  </section>
);

const TrailersSection = ({ movies }) => (
  <section>
    <h2>Trailers</h2>
    <div style={{ display: "flex", gap: "10px" }}>
      {movies.slice(5, 8).map((movie) => (
        <div key={movie._id}>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  </section>
);

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          "https://quickshowapp.onrender.com/shows/all"
        );
        if (data.success) {
          setMovies(data.shows);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <HeroSection movies={movies} />
      <FeaturedSection movies={movies} />
      <TrailersSection movies={movies} />
    </>
  );
};

export default Home;
