import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm'

import { Address } from './address'
import { Company } from './company'

import { UserApi } from '../types/user'

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

  static fromRestResponse (data: UserApi): User {
    const user = new User()

    user.name = data.name
    user.username = data.username
    user.email = data.email

    const address = new Address()
    address.street = data.address.street
    address.suite = data.address.suite
    address.city = data.address.city
    address.zipcode = data.address.zipcode
    address.lat = data.address.geo.lat
    address.lng = data.address.geo.lng
    user.address = address

    user.phone = data.phone
    user.website = data.website

    const company = new Company()
    company.name = data.company.name
    company.catchPhrase = data.company.catchPhrase
    company.bs = data.company.bs
    user.company = company

    return user
  }
}
