import { useGame } from 'app/context/GameBoardContextProvider';

import type { IPiece } from 'app/types/IPiece';

import { useEffect } from 'react';
import { Direction } from 'src/types/Direction';

import { Square } from './Square';
import { Robot } from './Robot';
import { useFetchLastPosition } from 'app/hooks/usePositionHistory';

interface GameBoardProps {
  length?: number;
  width?: number;
}

const DEFAULT_ROWS = 5;
const DEFAULT_COLUMNS = 5;
const defaultPiece: IPiece = {
  id: '1',
  isActive: true,
  coordinates: { x: -1, y: -1 },
  isMovable: true,
  direction: Direction.NORTH,
  component: <Robot />,
  seq: 0,
};

export const GameBoard = ({ length, width }: GameBoardProps) => {
  const x = length || DEFAULT_ROWS;
  const y = width || DEFAULT_COLUMNS;

  const { setRows, setColumns, gameState, setPiece } = useGame();
  const { piece } = useFetchLastPosition('1');
  useEffect(() => {
    setRows(x);
    setColumns(y);
    setPiece(defaultPiece);
  }, [setColumns, setPiece, setRows, x, y]);

  useEffect(() => {
    if (piece) {
      setPiece({ ...piece, component: <Robot /> });
    }
  }, [piece, setPiece]);

  return (
    <div className="flex flex-col pt-[54px] items-center w-screen">
      <div
        style={{
          minWidth: '600px',
          display: 'grid',
          gridTemplateColumns: `repeat(${y}, 1fr)`,
          gridTemplateRows: `repeat(${x}, 1fr)`,
        }}
      >
        {gameState.board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div key={`${rowIndex}-${cellIndex}`}>
              <Square piece={cell.piece} coordinates={cell.coordinates} />
            </div>
          )),
        )}
      </div>
    </div>
  );
};
