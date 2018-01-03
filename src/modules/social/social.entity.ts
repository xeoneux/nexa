import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Social {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 20})
  name: string;
}
