import React from "react";

const ListGroup = ({
  genres,
  textProperty,
  valueProperty,
  selectedGenre,
  onGenreSelect
}) => {
  return (
    <ul className="list-group clickable">
      {genres.map(genre => (
        <li
          key={genre[valueProperty]}
          className={
            genre === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => {
            onGenreSelect(genre);
          }}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
