import React from "react";

const Piece = ({ type, color }) => {
  const imagePath = `./img/${color}_${type}.png`;
  return <img src={imagePath} alt={`${color} ${type}`} />;
};

export default Piece;
