import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

/* star */
function Star({ onRate, full, onHoverIn, onHoverOut, color, size }: any) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? <FullStar color={color} /> : <EmptyStar color={color} />}
    </span>
  );
}

function FullStar({ color }: { color: String }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={`${color}`}
      stroke={`${color}`}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function EmptyStar({ color }: { color: String }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={`${color}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

interface PropTypes {
  maxRating: Number;
  color?: String;
  size: Number;
  className?: String;
  message?: any[];
  defaultRating?: Number;
  setMovieRating?: (setMovie: any) => void;
}

function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  message = [],
  defaultRating = 0,
  setMovieRating,
}: PropTypes) {
  const textStyle: any = {
    lineHeight: "1",
    margin: "0",
    color: color,
    fontSize: `{size / 1.5}px`,
  };

  const [starRating, setStarRating] = useState<Number>(defaultRating);
  const [tempStarRating, setTempStarRating] = useState<Number>(0);

  function handleRating(rating: Number) {
    setStarRating(rating); // inside function
    if (setMovieRating) return setMovieRating(rating); // setRating outside function callback
  }

  function handleTempRating(rating: Number) {
    setTempStarRating(rating);
  }

  return (
    <div style={containerStyle} className={`${className}`}>
      <div style={starContainerStyle}>
        {Array.from({ length: +maxRating }, function (_, i) {
          return (
            <Star
              key={i}
              onRate={() => handleRating(i + 1)}
              full={
                tempStarRating ? +tempStarRating >= i + 1 : +starRating >= i + 1
              }
              onHoverIn={() => handleTempRating(i + 1)}
              onHoverOut={() => handleTempRating(0)}
              color={color}
              size={size}
            />
          );
        })}
      </div>
      <p style={textStyle}>
        {message.length === maxRating
          ? message[+tempStarRating ? +tempStarRating - 1 : +starRating - 1]
          : tempStarRating
          ? tempStarRating
          : ""}
      </p>
    </div>
  );
}

export default StarRating;
