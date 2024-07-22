import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoles } from '../enums/role.enum';
import { School } from 'src/school/entities/school.entity';
import { SchoolClass } from 'src/school/entities/school-class.entity';

import { ClassSection } from 'src/class-section/entities/class-section.entity';

/**
 * It describes the schema for user table in database.
 */
@Entity('user_details')
export class User {
  /**
   * auto-generated unique uuid primary key for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  /**
   * googleId of the user user for google auth.
   */
  @Column({ unique: true, default: null })
  @Exclude({ toPlainOnly: true })
  googleID: string;

  /**
   * firstName of user.
   */
  @Column({ length: 50 })
  @ApiProperty()
  firstName: string;

  /**
   * lastName of user.
   */
  @Column({ length: 50 })
  @ApiProperty()
  lastName: string;

  /**
   * email address of user.
   */
  @Column({ unique: true, length: 100 })
  @ApiProperty()
  email: string;

  /**
   * hashed password of user.
   */
  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  /**
   * password reset Token for password reset methods.
   */
  @Column({ default: null })
  @Exclude({ toPlainOnly: true })
  passwordResetToken: string;

  /**
   * password reset token Expiration time .
   */
  @Column({ default: null })
  @Exclude({ toPlainOnly: true })
  passwordResetExpires: string;

  /**
   * represents activation state of user.
   */
  @Column({ type: 'boolean', default: false })
  @ApiProperty({ default: false })
  active: boolean;

  /**
   * account activation token for user.
   */
  @Column({ default: null })
  @Exclude({ toPlainOnly: true })
  activeToken: string;

  /**
   * role of user. default is UserRoles.USER.
   */
  @Column('enum', {
    array: true,
    enum: UserRoles,
    default: `{${UserRoles.USER}}`,
  })
  @ApiProperty({
    enum: UserRoles,
    default: [UserRoles.USER],
  })
  roles: UserRoles[];
  // /**
  //  * Many-to-many relationship with Role entity.
  //  */
  // @ManyToMany(() => Role)
  // @JoinTable()
  // roles: Role[];
  // NOTE: You can change the size to assign multiple roles to a single user.

  /**
   * timestamp for date of user creation.
   */
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  /**
   * timestamp for date of user information updation.
   */
  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => School, (school) => school.createdBy)
  school: School;

  @OneToMany(() => SchoolClass, (school) => school.createdBy)
  schoolClass: SchoolClass;

  @OneToMany(() => ClassSection, (classSection) => classSection.created_by)
  class_section: ClassSection;

  @OneToMany(() => ClassSection, (classSection) => classSection.updated_by)
  class_section_user: ClassSection;

  @OneToMany(() => ClassSection, (classSection) => classSection.class_teacher)
  class_teacher: ClassSection;

  @OneToMany(() => ClassSection, (classSection) => classSection.class_monitor)
  class_monitor: ClassSection;
}
