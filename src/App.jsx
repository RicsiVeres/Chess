import React, { useState } from "react";
import Step from "./Step";
import getPieceMoves from "./getPieceMoves";

import white_rook from "./img/white_rook.png";
import white_queen from "./img/white_queen.png";
import white_knight from "./img/white_knight.png";
import white_king from "./img/white_king.png";
import white_bishop from "./img/white_bishop.png";
import black_rook from "./img/black_rook.png";
import black_pawn from "./img/black_pawn.png";
import white_pawn from "./img/white_pawn.png";
import black_queen from "./img/black_queen.png";
import black_knight from "./img/black_knight.png";
import black_king from "./img/black_king.png";
import black_bishop from "./img/black_bishop.png";

const Chessboard = () => {
  const columns = ["A", "B", "C", "D", "E", "F", "G", "H"]; // Módosított sor

  const pieceData = [
    [
      black_rook,
      black_knight,
      black_bishop,
      black_queen,
      black_king,
      black_bishop,
      black_knight,
      black_rook,
    ],
    [
      black_pawn,
      black_pawn,
      black_pawn,
      black_pawn,
      black_pawn,
      black_pawn,
      black_pawn,
      black_pawn,
    ],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    [
      white_pawn,
      white_pawn,
      white_pawn,
      white_pawn,
      white_pawn,
      white_pawn,
      white_pawn,
      white_pawn,
    ],
    [
      white_rook,
      white_knight,
      white_bishop,
      white_queen,
      white_king,
      white_bishop,
      white_knight,
      white_rook,
    ],
  ];

  const renderChessboardCells = () => {
    const cells = [];
    const [isShown, setIsShown] = useState(true);

    const handleCellClick = (event, row, col) => {
      if (isShown) {
        document
          .querySelectorAll(".black-cell, .white-cell")
          .forEach((cell) => {
            cell.style.backgroundColor = cell.classList.contains("black-cell")
              ? "#b58863"
              : "#f0d9b5";
          });
        setIsShown(false);
      } else {
        const piece = pieceData[row][col];
        if (piece) {
          const fileName = piece.substring(piece.lastIndexOf("/") + 1);
          const apngName = fileName.split(".")[0];
          getPieceMoves(
            apngName.split("_")[1],
            event.currentTarget.id,
            fileName.split("_")[0]
          );
        }
        setIsShown(true);
      }
    };

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const cellId = `${columns[col]}${row + 1}`; // Módosított sor

        cells.push(
          <div
            key={`${row}${col}`}
            className={(row + col) % 2 === 1 ? "black-cell" : "white-cell"}
            id={cellId}
            onClick={(event) => handleCellClick(event, row, col)}
          >
            {pieceData[row][col] && (
              <img src={pieceData[row][col]} alt={`piece_${row}_${col}`} />
            )}
          </div>
        );
      }
    }

    return cells;
  };

  return <div className="chessboard">{renderChessboardCells()}</div>;
};

export default Chessboard;
