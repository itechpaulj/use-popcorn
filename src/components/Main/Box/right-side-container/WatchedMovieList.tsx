import { useState } from "react";

const average = (arr: Number[]): Number =>
  arr.reduce((acc: Number, cur: Number) => +acc + +cur / arr.length, 0);
interface IsWatched {
  watched: any[];
  handleDeleteWatchedMovie(data: String): void;
}

function WatchedMovieList({ watched, handleDeleteWatchedMovie }: IsWatched) {
  //   {
  //     // watched,
  //     //handleDeleteWatchedMovie
  //   }
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <>
          <WatchedMovieSummary watched={watched} />

          <ul className="list">
            {watched?.map((movie) => (
              <WatchedMovie
                movie={movie}
                key={`${movie.imdbID}`}
                handleDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

interface IsWatchedSummary {
  watched: any[];
}
function WatchedMovieSummary({ watched }: IsWatchedSummary) {
  const avgImdbRating = average(
    watched.map((movie) => (isNaN(movie.imdbRating) ? 0 : movie.imdbRating))
  );
  const avgUserRating = average(
    watched.map((movie) => (isNaN(movie.userRating) ? 0 : movie.userRating))
  );
  const avgRuntime = average(
    watched.map((movie) =>
      isNaN(movie.RuntimeNumber) ? 0 : movie.RuntimeNumber
    )
  );
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{Number(avgImdbRating).toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{Number(avgUserRating).toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Number(avgRuntime).toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({
  movie,
  handleDeleteWatchedMovie,
}: {
  movie: {
    Poster: String;
    Title: String;
    imdbRating: Number;
    userRating: Number;
    RuntimeNumber: Number;
    imdbID: String;
  };
  handleDeleteWatchedMovie(data: String): void;
}) {
  return (
    <li>
      <img src={`${movie.Poster}`} alt={`${movie.Title} poster`} />
      <h3>{`${movie.Title}`}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{+movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{+movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>
            {isNaN(+movie.RuntimeNumber) ? 0 : +movie.RuntimeNumber} min
          </span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleDeleteWatchedMovie(`${movie.imdbID}`)}
        >
          &times;
        </button>
      </div>
    </li>
  );
}

export default WatchedMovieList;
