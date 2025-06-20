import { useCallback, useEffect, useRef, useState } from 'react';

import _ from 'lodash';
import type { CreatePositionHistoryDto } from 'src/position-history/dto/create-position-history.dto';
import type { Move } from 'src/types/Move';
import type { IPiece } from 'app/types/IPiece';
import type { Command } from 'src/types/Command';

const API_URL = '/api/position-history';

export const usePositionBuffer = (id?: string) => {
  const bufferRef = useRef<Move[]>([]);

  const flushBuffer = _.debounce(async () => {
    const moves = bufferRef.current;
    if (moves.length > 0) {
      bufferRef.current = [];
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          moves,
        } as CreatePositionHistoryDto),
      });
    }
  }, 150);

  const recordMove = useCallback(
    (piece: IPiece, command: Command) => {
      if (!id) {
        return;
      }
      const {
        coordinates: { x, y },
        direction,
        seq,
      } = piece;
      const move: Move = {
        x,
        y,
        direction,
        seq: seq + 1,
        command,
      };
      bufferRef.current.push(move);
      flushBuffer();
    },
    [flushBuffer, id],
  );

  return { recordMove };
};

export const useFetchLastPosition = (id?: string) => {
  const [piece, setPiece] = useState<IPiece | null>(null);
  useEffect(() => {
    if (!id) return;
    const fetchLastPosition = async () => {
      const response = await fetch(`${API_URL}/last-position/${id}`);
      const data = await response.json();
      setPiece(data);
    };
    fetchLastPosition();
  }, [id]);

  return { piece };
};
