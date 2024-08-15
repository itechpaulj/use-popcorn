import { useState, useEffect } from "react";
import { isQueryResult, URL } from "../../App";

function FetchMovies(hasQuery: String) {
  // search
  const [search, isSetSearch] = useState<String>("");
  const [query, setQuery] = useState<isQueryResult>([]); // search query
  // error
  const [error, setError] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");

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

  return {
    search,
    isSetSearch,
    query,
    setQuery,
    error,
    setError,
    errorMessage,
    setErrorMessage,
  };
}

export default FetchMovies;
