import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('properties')
export default class Property {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  type_property: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  neighborhood: string;

  @Column()
  price: number;

  @Column()
  dependencies: string;
}