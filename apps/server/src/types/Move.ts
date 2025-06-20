import { Command } from './Command';
import { Direction } from './Direction';

export interface Move {
  x: number;
  y: number;
  direction: Direction;
  command: Command;
  seq: number;
}
