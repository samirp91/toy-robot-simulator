import { Column, DataType, Model, Table } from 'sequelize-typescript';

import { Direction } from '../../types/Direction';
import { Command } from '../../types/Command';

@Table
export class PositionHistory extends Model<PositionHistory> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.ENUM(...Object.values(Direction)),
    allowNull: false,
  })
  direction: Direction;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  x: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  y: number;

  @Column({
    type: DataType.ENUM(...Object.values(Command)),
    allowNull: false,
  })
  command: Command;

  @Column(DataType.NUMBER)
  seq: number;
}
