import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 20})
  name: string;
}
