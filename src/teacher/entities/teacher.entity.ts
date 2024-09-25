import { School } from 'src/school/entities/school.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * user refernce from user entity
   */
  @OneToOne(() => User, user => user.teacher)
  user: User;

  /**
   * school refernce from school entity
   * */
  @OneToOne(() => School, school => school.teacher)
  school: School;

  /**
   * primary contact number of teacher
   * */
  @Column({ length: 20 })
  primary_contact_number: string;

  /**
   * status of teacher - active or inactive
   * */
  @Column({ type: 'boolean', default: true })
  active: boolean;

  /**
   * timestamp for date of teacher hire.
   * */
  @CreateDateColumn()
  hire_date: Date;

  /**
   * department of teacher // later depart will be gaken form database or
   * */
  @Column({ length: 100 })
  department: string;

  /**
   * employee id of teacher
   * */
  @Column({ type: 'int', generated: 'increment' })
  employee_id: number;

  /**
   * address of teacher
   * */
  @Column({ type: 'json', default: null })
  address: JSON;

  /**
   * expreince of teacher
   * */
  @Column({ type: 'int', default: 0 })
  experience_years: number;

  /**
   * spesialization of teacher // later depart will be gaken form database or enum
   * */
  @Column({ length: 100 })
  specialization: string;

  /**
   * salary of teacher
   * */
  @Column({ type: 'int' })
  salary: number;
}
