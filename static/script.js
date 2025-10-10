document.addEventListener("DOMContentLoaded", () => {
  let selectedPiece = null;
  let currentPlayer = "red";

  let redScore = 0;
  let blackScore = 0;

  const board = document.querySelector(".board");
  const squares = Array.from(document.querySelectorAll(".square"));

  const turnPlayerEl = document.getElementById("turn-player");
  const redScoreEl = document.getElementById("red-score");
  const blackScoreEl = document.getElementById("black-score");

  const updateUI = () => {
    turnPlayerEl.textContent =
      currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
    redScoreEl.textContent = redScore;
    blackScoreEl.textContent = blackScore;
  };

  const getRowCol = (square) => {
    const index = squares.indexOf(square);
    return { row: Math.floor(index / 8), col: index % 8 };
  };

  const isValidMove = (from, to, pieceColor) => {
    const rowDiff = to.row - from.row;
    const colDiff = Math.abs(to.col - from.col);
    const forward = pieceColor === "red" ? 1 : -1;

    if (rowDiff === forward && colDiff === 1) return true;

    if (rowDiff === 2 * forward && colDiff === 2) {
      const midRow = from.row + forward;
      const midCol = (from.col + to.col) / 2;
      const middleSquare = squares[midRow * 8 + midCol];
      const midPiece = middleSquare.querySelector(".piece");

      if (midPiece && !midPiece.classList.contains(pieceColor)) {
        middleSquare.innerHTML = "";

        if (pieceColor === "red") redScore++;
        else blackScore++;

        updateUI();
        return true;
      }
    }
    return false;
  };

  document.querySelectorAll(".piece").forEach((piece) => {
    piece.addEventListener("click", (event) => {
      if (!piece.classList.contains(currentPlayer)) return;

      if (selectedPiece) selectedPiece.classList.remove("selected");
      selectedPiece = event.target;
      selectedPiece.classList.add("selected");
    });
  });

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (selectedPiece && !square.querySelector(".piece")) {
        const fromSquare = selectedPiece.parentElement;
        const from = getRowCol(fromSquare);
        const to = getRowCol(square);

        if (isValidMove(from, to, currentPlayer)) {
          square.appendChild(selectedPiece);
          selectedPiece.classList.remove("selected");
          selectedPiece = null;

          currentPlayer = currentPlayer === "red" ? "black" : "red";
          updateUI();
        }
      }
    });
  });
  updateUI();
});
