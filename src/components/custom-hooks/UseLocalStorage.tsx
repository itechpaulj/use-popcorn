import { useState, useEffect } from "react";
import { GetOneMovie } from "../../App";

function UseLocalStorage(init: any[], key: String): any[] {
  const [value, setValue] = useState<GetOneMovie[]>(() => {
    let storageValue = localStorage.getItem(`${key}`) || "";
    return storageValue ? JSON.parse(storageValue) : init;
  }); //display all watched movies [right side container in div]

  useEffect(
    function () {
      localStorage.setItem(`${key}`, JSON.stringify(value));
    },
    [value, setValue, key]
  );

  return [value, setValue];
}

export default UseLocalStorage;
