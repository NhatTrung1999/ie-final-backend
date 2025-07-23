import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('IE_User')
export class IE_User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  account: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  factory: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  permission: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
