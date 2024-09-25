import { SchoolClass } from 'src/school/entities/school-class.entity';
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

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * user refernce from user entity
   */
  @OneToOne(() => User, (user) => user.student)
  user: User;

  /**
   * school refernce from school entity
   * */
  @OneToOne(() => School, (school) => school.student)
  school: School;

  /**
   * school class refernce from school class entity
   * */
  @OneToOne(() => SchoolClass, (schoolClass) => schoolClass.student)
  school_class: SchoolClass;

  /**
   * primary contact number of student
   * */
  @Column({ length: 20 })
  primary_contact_number: string;

  /**
   * status of student - active or inactive
   * */
  @Column({ type: 'boolean', default: true })
  active: boolean;

  /**
   * timestamp for date of student creation.
   * */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * timestamp for date of student modification.
   * */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Address of student in json format
   * */
  @Column({ type: 'json', default: null })
  address: JSON;

  /**
   * student roll number
   * */
  @Column({ default: null })
  roll_number: number;

  /**
   * student admission number auto increment
   * */
  @Column({ type: 'int', generated: 'increment' })
  admission_number: number;

  /**
   * student parent details in json format including name, contact number, email mother or father etc
   * */
  @Column({ type: 'json', default: null })
  parent_details: JSON;

  /**
   * student medical details in json format including blood group, allergies, medical history etc
   * */
  @Column({ type: 'json', default: null })
  medical_details: JSON;
}
