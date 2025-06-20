import type { JSX } from 'react';

import { Direction } from '../../src/types/Direction';

import type { Coordinates } from './Coordinates';

export interface IPiece {
  id: string;
  coordinates: Coordinates;
  isMovable: boolean;
  component?: JSX.Element;
  isActive: boolean;
  direction: (typeof Direction)[keyof typeof Direction];
  seq: number;
}
