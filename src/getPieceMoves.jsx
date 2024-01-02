import React from "react";

const FILES = ["A", "B", "C", "D", "E", "F", "G", "H"];
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8];

function isValidPosition(position) {
  return (
    position.length === 2 &&
    FILES.includes(position[0]) &&
    RANKS.includes(Number(position[1]))
  );
}

function getSquare(file, rank) {
  return file + rank;
}

function getPieceMoves(pieceType, currentPosition, color) {
  if (!isValidPosition(currentPosition)) {
    console.error("Érvénytelen pozíció formátum!");
    return [];
  }

  const [file, rank] = currentPosition;
  const possibleMoves = [];

  switch (pieceType.toLowerCase()) {
    case "knight":
      const moveOffsets = [
        { file: 2, rank: 1 },
        { file: 1, rank: 2 },
        { file: -1, rank: 2 },
        { file: -2, rank: 1 },
        { file: -2, rank: -1 },
        { file: -1, rank: -2 },
        { file: 1, rank: -2 },
        { file: 2, rank: -1 },
      ];

      moveOffsets.forEach((offset) => {
        const newFile = FILES.indexOf(file) + offset.file;
        const newRank = RANKS.indexOf(Number(rank)) + offset.rank;

        if (FILES[newFile] && RANKS[newRank]) {
          possibleMoves.push(getSquare(FILES[newFile], RANKS[newRank]));
        }
      });
      break;

    case "rook":
      const horizontalMoves = FILES.map((f) => getSquare(f, rank));
      const verticalMoves = RANKS.map((r) => getSquare(file, r));

      possibleMoves.push(...horizontalMoves, ...verticalMoves);
      break;

    case "bishop":
      for (let i = 1; i < 8; i++) {
        const moves = [
          getSquare(file + i, rank + i),
          getSquare(file + i, rank - i),
          getSquare(file - i, rank + i),
          getSquare(file - i, rank - i),
        ];
        possibleMoves.push(...moves.filter(isValidSquare));
      }
      break;

    case "queen":
      const queenHorizontalMoves = FILES.map((f) => getSquare(f, rank));
      const queenVerticalMoves = RANKS.map((r) => getSquare(file, r));

      possibleMoves.push(...queenHorizontalMoves, ...queenVerticalMoves);

      for (let i = 1; i < 8; i++) {
        const moves = [
          getSquare(file + i, Number(rank) + i),
          getSquare(file + i, Number(rank) - i),
          getSquare(file - i, Number(rank) + i),
          getSquare(file - i, Number(rank) - i),
        ];
        possibleMoves.push(...moves.filter(isValidSquare));
      }
      break;

    case "king":
      const kingMoves = [
        getSquare(file + 1, rank),
        getSquare(file - 1, rank),
        getSquare(file, rank + 1),
        getSquare(file, rank - 1),
        getSquare(file + 1, rank + 1),
        getSquare(file + 1, rank - 1),
        getSquare(file - 1, rank + 1),
        getSquare(file - 1, rank - 1),
      ];

      possibleMoves.push(...kingMoves.filter(isValidSquare));
      break;

    case "pawn":
      const pawnMoves = [];
      if (color == "black") {
        if (rank == 2) {
          // Kezdeti lépések esetén a gyalog két mezőt is léphet
          const square1 = getSquare(file, Number(rank) + 1);
          const square2 = getSquare(file, Number(rank) + 2);

          pawnMoves.push(square1, square2);
        } else {
          const square1 = getSquare(file, Number(rank) + 1);
          pawnMoves.push(square1);
        }

        const validPawnMoves = pawnMoves.filter(isValidSquare);
        possibleMoves.push(...validPawnMoves);
        break;
      } else {
        if (rank == 7) {
          // Kezdeti lépések esetén a gyalog két mezőt is léphet
          const square1 = getSquare(file, Number(rank) - 1);
          const square2 = getSquare(file, Number(rank) - 2);

          pawnMoves.push(square1, square2);
        } else {
          const square1 = getSquare(file, Number(rank) - 1);
          pawnMoves.push(square1);
        }

        const validPawnMoves = pawnMoves.filter(isValidSquare);
        possibleMoves.push(...validPawnMoves);
        break;
      }
  }

  highlightValidMoves(possibleMoves);

  return possibleMoves;
}

function isValidSquare(square) {
  return (
    square.length === 2 &&
    FILES.includes(square[0]) &&
    RANKS.includes(Number(square[1]))
  );
}

function highlightValidMoves(possibleMoves) {
  possibleMoves.forEach((square) => {
    const element = document.querySelector(`#${square}`);
    if (element) {
      element.style.backgroundColor = "#f5e766";
    }
  });
}

export default getPieceMoves;
