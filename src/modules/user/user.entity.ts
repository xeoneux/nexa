import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 20})
  name: string;

  @Column() @Index({unique: true})
  email: string;

  @Column()
  password: string;
}