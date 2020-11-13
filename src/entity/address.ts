import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  suite: string;

  @Column()
  city: string;

  @Column()
  zipcode: string;

  @Column()
  lat: string;

  @Column()
  lng: string;
}
