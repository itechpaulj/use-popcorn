import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./components/Star/StarRating";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <StarRating
      maxRating={5}
      color="blue"
      size={28}
      defaultRating={1}
      message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    /> */}

    <App />
  </React.StrictMode>
);
