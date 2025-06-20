import type { IPiece } from 'app/types/IPiece';

interface PieceProps {
  piece: IPiece | null;
}

export const Piece = ({ piece }: PieceProps) => {
  return (
    <div
      id={piece?.id}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {piece?.component}
    </div>
  );
};
