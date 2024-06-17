
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column()
  name: string
  

  // many to one i.e an array ot more than one task 
  @ManyToOne(()=> Employee, employee => employee.task, {onDelete: "SET NULL"})
  employee :Employee
  

 

}