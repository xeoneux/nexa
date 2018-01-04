import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Analytic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 20})
  name: string;
}
