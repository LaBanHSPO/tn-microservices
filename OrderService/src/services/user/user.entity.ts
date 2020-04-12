import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity("users",{schema: "public" })
export class UserEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  full_name: string;

  @Column()
  phone: string;

  @Column({ nullable:false })
  avatar: string;

  @Column({ default: true })
  isActive: boolean;
}