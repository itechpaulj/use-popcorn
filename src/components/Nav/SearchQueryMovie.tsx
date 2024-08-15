//function SearchQueryMovie({ query, setQuery }) {
//   const inputEl = useRef(null); // useRef(boolen || String || null|| Number || Selecting a DOM element like a input)

//   useKey("Enter", function () {
//     //if (document.activeElement === inputEl) return;
//     if (inputEl.current.value !== "") return setQuery("");

//     inputEl.current.focus();
//   }); // [custom-hook]

// api
import { useRef } from "react";
interface inputSeacrFound {
  search: String;
  isSetSearch(data: String): void;
}

function SearchQueryMovie({ search, isSetSearch }: inputSeacrFound) {
  const globalSearch = useRef<any>(null);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={`${search}`}
      onChange={(e) => isSetSearch(`${e.target.value}`)}
      ref={globalSearch}
    />
  );
}

export default SearchQueryMovie;
