import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm'

import { Address } from './address'
import { Company } from './company'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @OneToOne(() => Company)
    @JoinColumn()
    company: Company;

    @Column()
    phone: string;

    @Column()
    website: string;
}
