/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Coordinates } from 'app/types/Coordinates';
import type { IPiece } from 'app/types/IPiece';
import { Direction } from 'src/types/Direction';
import { Command } from 'src/types/Command';
import { usePositionBuffer } from 'app/hooks/usePositionHistory';

// Each square holds its piece (or null), its coords, and occupancy flag
type GameSquare = {
  piece: IPiece | null;
  coordinates: Coordinates;
  isOccupied: boolean;
};

type GameState = {
  board: GameSquare[][];
  rows: number;
  columns: number;
};

type GameContextType = {
  gameState: GameState;
  move: (
    command: Command,
    source?: Coordinates,
    destination?: Coordinates,
    direction?: (typeof Direction)[keyof typeof Direction],
  ) => void;
  piece: IPiece | null;
  setRows: (rows: number) => void;
  setColumns: (columns: number) => void;
  setPiece: (piece: IPiece | null) => void;
  handleClick: (coordinates: Coordinates) => void;
  rotate: (command: Command.LEFT | Command.RIGHT) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const buildBoard = (rows: number, columns: number): GameSquare[][] =>
  Array(rows)
    .fill(null)
    .map((_, rowIndex) =>
      Array(columns)
        .fill(null)
        .map((_, colIndex) => ({
          piece: null,
          isOccupied: false,
          coordinates: { x: colIndex, y: rows - 1 - rowIndex },
        })),
    );

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [command, setCommand] = useState<Command | null>();
  const [gameState, setGameState] = useState<GameState>({
    board: buildBoard(rows, columns),
    rows,
    columns,
  });
  const [piece, setPiece] = useState<IPiece | null>(null);

  const { recordMove } = usePositionBuffer(piece?.id);

  useEffect(() => {
    setGameState({ board: buildBoard(rows, columns), rows, columns });
  }, [rows, columns]);

  const isValidSpace = ({ x, y }: Coordinates): boolean => {
    const { rows: maxRows, columns: maxCols } = gameState;
    return x >= 0 && x < maxCols && y >= 0 && y < maxRows;
  };
  const isValidMove = ({ x, y }: Coordinates): boolean => {
    const { rows: maxRows } = gameState;
    if (!isValidSpace({ x, y })) return false;
    const rowIdx = maxRows - 1 - y;
    return !gameState.board[rowIdx]?.[x]?.isOccupied;
  };

  const getNewDestination = () => {
    if (!piece) return { x: 0, y: 0 };
    const { coordinates } = piece;
    const { direction } = piece;
    const { x, y } = coordinates;
    switch (direction) {
      case Direction.NORTH:
        return { x, y: y + 1 };
      case Direction.SOUTH:
        return { x, y: y - 1 };
      case Direction.EAST:
        return { x: x + 1, y };
      case Direction.WEST:
        return { x: x - 1, y };
      default:
        return { x, y };
    }
  };

  const move = (
    command: Command,
    source?: Coordinates,
    destination?: Coordinates,
    dir?: (typeof Direction)[keyof typeof Direction],
  ) => {
    if (!piece) return;
    const currentSource = source ?? piece?.coordinates ?? { x: 0, y: 0 };
    const currentDestination = destination ?? getNewDestination();
    if (!isValidMove(currentDestination)) return;
    const newDir = dir ?? piece.direction;
    const updatedPiece: IPiece = {
      ...piece,
      coordinates: currentDestination,
      direction: newDir,
    };
    setPiece(updatedPiece);
    setCommand(command);

    setGameState((prev) => {
      const maxRows = prev.rows;
      const grid = prev.board.map((row) => row.map((cell) => ({ ...cell })));
      const srcRow = maxRows - 1 - currentSource.y;
      if (isValidSpace(currentSource)) {
        grid[srcRow][currentSource.x].piece = null;
        grid[srcRow][currentSource.x].isOccupied = false;
      }
      const dstRow = maxRows - 1 - currentDestination.y;
      grid[dstRow][currentDestination.x].piece = updatedPiece;
      grid[dstRow][currentDestination.x].isOccupied = true;
      return { board: grid, rows: prev.rows, columns: prev.columns };
    });
  };

  useEffect(() => {
    if (!piece) return;
    setGameState((prev) => {
      const maxRows = prev.rows;
      const grid = prev.board.map((row) => row.map((cell) => ({ ...cell })));
      const pRow = maxRows - 1 - piece.coordinates.y;
      if (isValidSpace(piece.coordinates)) {
        grid[pRow][piece.coordinates.x].piece = piece;
        grid[pRow][piece.coordinates.x].isOccupied = true;
      }
      return { ...prev, board: grid };
    });
  }, [piece]);

  useEffect(() => {
    if (!command || !piece) return;
    setCommand(null);
    recordMove(piece, command);
    setPiece({ ...piece, seq: piece.seq + 1 });
  }, [command, piece, recordMove]);

  const handleClick = (coord: Coordinates) => {
    if (piece) move(Command.PLACE, piece.coordinates, coord, Direction.NORTH);
  };

  const getNewDirection = (command: Command.LEFT | Command.RIGHT) => {
    if (command === Command.LEFT) {
      switch (piece?.direction) {
        case Direction.NORTH:
          return Direction.WEST;
        case Direction.WEST:
          return Direction.SOUTH;
        case Direction.SOUTH:
          return Direction.EAST;
        case Direction.EAST:
          return Direction.NORTH;
      }
    } else {
      switch (piece?.direction) {
        case Direction.NORTH:
          return Direction.EAST;
        case Direction.EAST:
          return Direction.SOUTH;
        case Direction.SOUTH:
          return Direction.WEST;
        case Direction.WEST:
          return Direction.NORTH;
      }
    }
    return Direction.NORTH;
  };
  const rotate = (command: Command.LEFT | Command.RIGHT) => {
    const newDirection = getNewDirection(command);
    if (piece) {
      setPiece({ ...piece, direction: newDirection });
      setCommand(command);
    }
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        move,
        piece,
        setRows,
        setColumns,
        setPiece,
        handleClick,
        rotate,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
