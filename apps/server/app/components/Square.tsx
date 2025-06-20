import type { IPiece } from 'app/types/IPiece';

import type { Coordinates } from 'app/types/Coordinates';

import { useGame } from 'app/context/GameBoardContextProvider';

import { Piece } from './Piece';

interface SquareProps {
  coordinates: Coordinates;
  piece: IPiece | null;
}

export const Square = ({ piece, coordinates }: SquareProps) => {
  const { handleClick } = useGame();
  return (
    <div
      id={`square-${coordinates.x}-${coordinates.y}`}
      className="w-full min-w-[80px] aspect-square flex items-center justify-center border border-solid border-[rgb(106,107,107)] bg-[rgb(42,53,56)] hover:bg-[rgb(52,63,66)] active:bg-[rgb(32,43,46)] _animation-transition "
      onClick={() => handleClick(coordinates)}
    >
      <Piece piece={piece} />
    </div>
  );
};
