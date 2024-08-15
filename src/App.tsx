import "./App.css";
import { useState } from "react";

// Nav
import Nav from "./components/Nav/Nav";
import Logo from "./components/Nav/Logo";
import SearchQueryMovie from "./components/Nav/SearchQueryMovie";
import NumResultLengthMovie from "./components/Nav/NumResultLengthMovie";
// Nav

// main
import Main from "./components/Main/Main";

// box
import Box from "./components/Main/Box/Box";
import MovieLists from "./components/Main/Box/right-side-container/MovieLists"; // left side container

// =================
import MovieDetails from "./components/Main/Box/left-side-container/MovieDetails"; // right side container
import WatchedMovieList from "./components/Main/Box/right-side-container/WatchedMovieList";

// custom hook
import FetchMovies from "./components/custom-hooks/FetchMovies";
import UseLocalStorage from "./components/custom-hooks/UseLocalStorage";
// api
export const KEY: String = "f6bed03a";
export const WEBSITE: String = "https://www.omdbapi.com";
export const URL: String = `${WEBSITE}/?apikey=${KEY}`;

export interface GetOneMovie {
  Title: String;
  Year: String;
  imdbID: String;
  Type: String;
  Poster: String;

  Runtime?: String;
  imdbRating?: String;
  Plot?: String;
  Released?: String;
  Actors?: String;
  Director?: String;
}
export type isIdQuery = GetOneMovie[];

export type isQueryResult = any[];

export type IsWatched = {
  Title: String;
  Year: String;
  imdbID?: String;
  Type?: String;
  Poster: String;
  Runtime?: String;
  imdbRating?: String;
  Plot?: String;
  Released?: String;
  Actors?: String;
  Director?: String;
  userRating?: String;
};

function App() {
  const [selectedId, setSelectedId] = useState<isIdQuery>([]);
  const [watched, setWatched] = UseLocalStorage([], "watched"); // custom hooks: Note using local storage for json format

  const {
    search,
    isSetSearch,
    query,
    setQuery,
    error,
    //setError,
    errorMessage,
    //setErrorMessage,
  } = FetchMovies(`${URL}`); // custom hooks - fetch api

  function handleSelectedId(id: String): void {
    setSelectedId([]);
    setQuery((movies) =>
      movies.map((movie: GetOneMovie) => {
        if (movie.imdbID === id) {
          setSelectedId([
            {
              Title: movie.Title,
              Year: movie.Year,
              imdbID: movie.imdbID,
              Type: movie.Type,
              Poster: movie.Poster,
            },
          ]);
        }

        return movie;
      })
    );
  }

  function handleBackButonWatchedMovie() {
    setSelectedId(() => []);
  }

  function handleAddWatchList(addMovie: any): void {
    // note: remove if exist a id
    let [hasIdExistInMovie] = selectedId;

    setWatched((movies: isIdQuery) => {
      let [movieWatchListExist] = movies.filter(
        (movie) => movie.imdbID === hasIdExistInMovie.imdbID
      );

      if (movieWatchListExist) {
        if (movieWatchListExist.imdbID === hasIdExistInMovie.imdbID) {
          return [...movies];
        }
      }

      return [...movies, addMovie];
    });
  }

  function handleDeleteWatchedMovie(id: String): void {
    setWatched((movies: isIdQuery) =>
      movies.filter((movie) => movie.imdbID !== id)
    );
  }

  return (
    <>
      <Nav>
        <Logo />
        <SearchQueryMovie search={search} isSetSearch={isSetSearch} />
        <NumResultLengthMovie query={query} />
      </Nav>
      <Main>
        <Box>
          {error && errorMessage === "" && <Loading />}

          {error && errorMessage !== "" && (
            <ErrorMessage message={errorMessage} />
          )}
          {!error && (
            <MovieLists handleSelectedId={handleSelectedId} query={query} />
          )}

          {/* left container */}
        </Box>
        {/* ================= */}
        <Box>
          {selectedId.length === 1 ? (
            <MovieDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              handleBackButonWatchedMovie={handleBackButonWatchedMovie}
              setWatched={setWatched}
              handleAddWatchList={handleAddWatchList}
              watched={watched}
            />
          ) : (
            <WatchedMovieList
              watched={watched}
              handleDeleteWatchedMovie={handleDeleteWatchedMovie}
            />
          )}

          {/* right container */}
        </Box>
      </Main>
    </>
  );
}

export function Loading() {
  return <p className="loader">Loading ...</p>;
}

export function ErrorMessage({ message }: any) {
  return <p className="loader">❌ {message} </p>;
}

export default App;
