import { useEffect, useState } from "react";
import { GetOneMovie, IsWatched, URL, Loading } from "../../../../App";
import StarRating from "../../../Star/StarRating";

interface IsSelectedMovie {
  Title: String;
  Year: String;
  Poster: String;
  Runtime: String;
  imdbRating: String;
  imdbID: String;
  Plot: String;
  Released: String;
  Actors: String;
  Director: String;
}

interface IsMovieDetails {
  selectedId: GetOneMovie[];
  setSelectedId(data: GetOneMovie[]): void;
  handleBackButonWatchedMovie(data: any): void;
  setWatched(data: GetOneMovie[]): void;
  handleAddWatchList(data: IsWatched): void;
  watched: IsWatched[];
}

function MovieDetails({
  selectedId,
  setSelectedId,
  handleBackButonWatchedMovie,
  handleAddWatchList,
  watched,
}: IsMovieDetails) {
  let setMovieExist: IsSelectedMovie[] = [
    {
      Title: "",
      Year: "",
      Poster: "",
      Runtime: "",
      imdbRating: "",
      imdbID: "",
      Plot: "",
      Released: "",
      Actors: "",
      Director: "",
    },
  ];

  const [movie, setMovie] = useState<IsSelectedMovie[]>(setMovieExist);
  const [isLoading, setLoading] = useState<Boolean>(false);

  useEffect(
    function () {
      async function getMovieDetails<T>(url: String): Promise<T> {
        return fetch(`${url}`)
          .then((res) => {
            try {
              setLoading(true);
              if (!res.ok) {
                setLoading(false);
                throw new Error(
                  `Status: ${res.status}, Error:${res.statusText}`
                );
              }
              setLoading(false);
              return res.json();
            } catch (err) {
              setLoading(true);
              if (err instanceof Error) {
                console.log(err.message);
              }
            }
          })
          .then((data) => {
            try {
              setLoading(true);
              setMovie([
                {
                  Title: data.Title,
                  Year: data.Year,
                  Poster: data.Poster,
                  Runtime: data.Runtime,
                  imdbRating: data.imdbRating,
                  imdbID: data.imdbID,
                  Plot: data.Plot,
                  Released: data.Released,
                  Actors: data.Actors,
                  Director: data.Director,
                },
              ]);
              setLoading(false);
              return data;
            } catch (err) {
              if (err instanceof Error) {
                setLoading(false);
                console.log(err.message);
              }
            }
          });
      }

      if (+selectedId.length === 1) {
        let fullURL: String = `${URL}&i=${selectedId[0].imdbID}`;
        getMovieDetails<String>(fullURL);
      }
    },
    [selectedId]
  );

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && selectedId.length === 1 && (
        <SelectedMovieDetail
          movie={movie}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          handleBackButonWatchedMovie={handleBackButonWatchedMovie}
          handleAddWatchList={handleAddWatchList}
          watched={watched}
        />
      )}
    </>
  );
}

interface IsSelectedMovieDetail {
  movie: IsSelectedMovie[];
  setSelectedId(data: GetOneMovie[]): void;
  selectedId: GetOneMovie[];
  handleBackButonWatchedMovie(data: any): void;
  handleAddWatchList(data: any): void;
  watched: any[];
}

function SelectedMovieDetail({
  movie,
  setSelectedId,
  selectedId,
  handleBackButonWatchedMovie,
  handleAddWatchList, // call backFunction
  watched,
}: IsSelectedMovieDetail) {
  const [userRating, setUserRating] = useState<Number>(0);

  let addToWatchList: IsWatched & { RuntimeNumber: Number } = {
    imdbID: "",
    Title: "",
    Year: "",
    Poster: "",
    Runtime: "", // type of validate is number only
    imdbRating: "",
    userRating: "",
    RuntimeNumber: 0,
  };

  function onClickAddWatchList(movie: IsSelectedMovie[]) {
    addToWatchList = {
      imdbID: `${movie[0].imdbID}`,
      Title: `${movie[0].Title}`,
      Year: `${movie[0].Year}`,
      Poster: `${movie[0].Poster}`,
      Runtime: `${movie[0].Runtime}`,
      imdbRating: `${movie[0].imdbRating}`,
      userRating: `${userRating}`,
      RuntimeNumber:
        typeof movie[0].Runtime !== "undefined"
          ? +movie[0].Runtime.split(" ")[0]
          : 0, // type of validate is number only
    };
    handleAddWatchList(addToWatchList);
  }

  let [hasUserRating] = watched.filter(
    (watch) => watch.imdbID === selectedId[0].imdbID
  );

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={handleBackButonWatchedMovie}>
          &larr;
        </button>
        <img
          src={`${movie[0].Poster}`}
          alt={`Poster of ${movie[0].Title} movie`}
        />
        <div className="details-overview">
          <h2>{`${movie[0].Title}`}</h2>
          <p>
            {`${movie[0].Released}`} &bull; {`${movie[0].Runtime}`}
          </p>
          <p>
            <span>⭐</span>
            {+movie[0].imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {/* setMovieRating - userRating -> if click a button [StarRating] save a star rating for user rating*/}

          {hasUserRating && hasUserRating?.userRating && (
            <p>You Rated this movie {hasUserRating?.userRating} ⭐</p>
          )}

          {!hasUserRating && (
            <StarRating
              maxRating={10}
              size={20}
              setMovieRating={setUserRating}
            />
          )}

          {+userRating > 0 && !hasUserRating && (
            <button
              className="btn-add"
              onClick={() => onClickAddWatchList(movie)}
            >
              + Add to watch list
            </button>
          )}
        </div>
        <p>
          <em>{`${movie[0].Plot}`}</em>
        </p>
        <p>Starring {`${movie[0].Actors}`}</p>
        <p>Directed by {`${movie[0].Director}`}</p>
      </section>
    </div>
  );
}

export default MovieDetails;
