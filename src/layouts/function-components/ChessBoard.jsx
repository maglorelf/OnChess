import React, { useEffect, useRef, useState } from "react";
import { Chessground } from "chessground";
import { Chess } from "chess.js";
import "../../assets/chessground/chessground.base.css";
import "../../assets/chessground/chessground.brown.css";
import "../../assets/chessground/chessground.cburnett.css";

const ChessBoard = ({ fen = "start", pgn = "", interactive = true, customStyles = {} }) => {
  const boardRef = useRef(null);
  const chessRef = useRef(new Chess());
  const [boardInstance, setBoardInstance] = useState(null);

  useEffect(() => {
    // Initialize the chess.js instance with FEN if provided
    if (fen !== "start") {
      try {
        chessRef.current.load(fen);
      } catch (error) {
        console.error("Invalid FEN:", error);
        // Fall back to starting position
        chessRef.current = new Chess();
      }
    }

    // Initialize the chessground board
    if (boardRef.current && !boardRef.current.classList.contains("cg-wrap")) {
      const config = {
        fen: chessRef.current.fen(),
        viewOnly: !interactive,
        movable: interactive ? {
          color: "white",
          free: false,
          dests: getDests(chessRef.current),
          events: {
            after: (orig, dest) => {
              const move = chessRef.current.move({
                from: orig,
                to: dest,
                promotion: "q", // always promote to queen for simplicity
              });
              
              if (boardInstance) {
                boardInstance.set({
                  fen: chessRef.current.fen(),
                  turnColor: chessRef.current.turn() === "w" ? "white" : "black",
                  movable: {
                    color: chessRef.current.turn() === "w" ? "white" : "black",
                    dests: getDests(chessRef.current),
                  },
                  check: chessRef.current.isCheck(),
                });
              }
            },
          },
        } : undefined,
        animation: {
          duration: 200,
        },
        highlight: {
          lastMove: true,
          check: true,
        },
      };

      const cg = Chessground(boardRef.current, config);
      setBoardInstance(cg);

      // Load PGN if provided
      if (pgn && pgn.length > 0) {
        try {
          const chess = new Chess();
          chess.loadPgn(pgn);
          cg.set({ fen: chess.fen() });
        } catch (error) {
          console.error("Invalid PGN:", error);
        }
      }

      return () => {
        cg.destroy();
      };
    }
  }, [fen, pgn, interactive]);

  // Helper function to get possible destinations for each piece
  function getDests(chess) {
    const dests = new Map();
    chess.SQUARES.forEach(s => {
      const moves = chess.moves({ square: s, verbose: true });
      if (moves.length) dests.set(s, moves.map(m => m.to));
    });
    return dests;
  }

  return (
    <div className="chess-board-container" style={{ width: "100%", maxWidth: "500px", margin: "0 auto", ...customStyles }}>
      <div ref={boardRef} style={{ width: "100%", height: "100%", aspectRatio: "1" }}></div>
    </div>
  );
};

export default ChessBoard;