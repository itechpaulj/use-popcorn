import { useState } from "react";

interface MovieFound {
  query: any[];
  handleSelectedId(data: {}): void;
}

function MovieLists({ query, handleSelectedId }: MovieFound) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && (
        <ul className="list list-movies">
          {query instanceof Array &&
            query?.map((movie) => (
              <MovieList
                movie={movie}
                key={`${movie.imdbID}`}
                handleSelectedId={handleSelectedId}
              />
            ))}
        </ul>
      )}
    </>
  );
}

type ObjectInMovie = {
  movie: {
    Title: String;
    Year: String;
    imdbID: String;
    Type: String;
    Poster: String;
  };
  handleSelectedId(data: {}): void;
};

function MovieList({ movie, handleSelectedId }: ObjectInMovie) {
  return (
    <li onClick={() => handleSelectedId(movie.imdbID)}>
      <img src={`${movie.Poster}`} alt={`${movie.Title} poster`} />
      <h3>{`${movie.Title}`}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{`${movie.Year}`}</span>
        </p>
      </div>
    </li>
  );
}

export default MovieLists;
