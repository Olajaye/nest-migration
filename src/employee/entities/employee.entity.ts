import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContactInfo } from "./contact-info.entity";
import { Task } from "./task.entity";
import { Meeting } from "./meeting.entity";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  // self refrencing
  @ManyToOne(() => Employee, employee => employee.directReport, { onDelete: "SET NULL" })
  manager: Employee
  
  @OneToMany(()=> Employee, employee => employee.manager )
  directReport: Employee[]

  //one to one that is each employee has a contact info and the fKey is in the contact table
  @OneToOne(()=> ContactInfo, contactInfo => contactInfo.employee)
  contactInfo: ContactInfo;



  // one to many it one employee has many task or more that one task

  @OneToMany(()=> Task, task => task.employee)
  task: Task[]

  @ManyToMany(() => Meeting, meeting => meeting.attendees)
  @JoinTable()
  meeting : Meeting
}
