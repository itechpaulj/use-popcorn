import "./App.css";
import { useEffect, useState } from "react";

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

// api
export const KEY: String = "f6bed03a";
export const WEBSITE: String = "http://www.omdbapi.com";
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
type isIdQuery = GetOneMovie[];
type isQueryResult = any[];

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
  // search
  const [search, isSetSearch] = useState<String>("");
  const [query, setQuery] = useState<isQueryResult>([]); // search query
  // selected per each movie
  const [selectedId, setSelectedId] = useState<isIdQuery>([]);
  const [watched, setWatched] = useState<GetOneMovie[]>([]);
  // error
  const [error, setError] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");

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

    setWatched((movies) => {
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
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  }

  // use Effect

  useEffect(
    function () {
      function errMessage({ err }: any) {
        if (err instanceof Error) {
          setErrorMessage(`${err.message}`);
          setError(true);
        }
      }
      async function getApiMovies<T>(url: String): Promise<T> {
        const controller = new AbortController();
        setError(true);
        return fetch(`${url}`, { signal: controller.signal })
          .then((res) => {
            try {
              if (!res.ok) {
                setError(true);
                throw new Error(
                  `Status: ${res.status}, Error: ${res.statusText}`
                );
              }
              setErrorMessage("");
              setError(false);
              return res.json();
            } catch (err) {
              if (err instanceof Error) {
                if (`${err.name}` === "AbortError") {
                  return errMessage(err);
                }
                setErrorMessage(`${err.message}`);
              }
            }
          })
          .then((data) => {
            try {
              if (data.Response === "False") {
                setError(true);
                throw new Error("Movie not Found");
              }
              setErrorMessage("");
              setError(false);
              return data;
            } catch (err) {
              if (err instanceof Error) {
                if (`${err.name}` === "AbortError") {
                  return errMessage(err);
                }
                setErrorMessage(`${err.message}`);
              }
            }
          });
      }

      if (search.length > 2) {
        let fullUrl: String = `${URL}&s=${search}`;

        getApiMovies<String>(fullUrl)
          .then((data: any) => {
            return setQuery(() => data?.Search);
          })
          .catch((err) => {
            setErrorMessage(err.message);
            return err.message;
          });
      }
    },
    [search, setQuery]
  );
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
