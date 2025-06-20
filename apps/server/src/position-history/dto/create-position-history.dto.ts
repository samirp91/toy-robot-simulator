import { Move } from 'src/types/Move';

export class CreatePositionHistoryDto {
  userId: string;
  moves: Move[];
}
