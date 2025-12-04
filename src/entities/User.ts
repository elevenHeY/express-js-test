import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

/**
 * User Entity
 * 
 * Vergleich zu Python/SQLAlchemy:
 * @Entity() ≈ Base = declarative_base()
 * @Column() ≈ Column()
 * @PrimaryGeneratedColumn() ≈ Column(Integer, primary_key=True, autoincrement=True)
 */
@Entity('users')
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}