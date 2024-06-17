import { ContactInfo } from './entities/contact-info.entity';
import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Meeting } from './entities/meeting.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Employee) private employeeRepositry: Repository<Employee>,
    @InjectRepository(ContactInfo) private contactInfoRepositry: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepositry: Repository<Meeting>,
  @InjectRepository(Task) private taskRepositry: Repository<Task>,) { }

  async seed() {
    const ceo = this.employeeRepositry.create({firstName: "jayeola"})
    await this.employeeRepositry.save(ceo)

    const ceoContactInfo = this.contactInfoRepositry.create({ email: "jayeola@gamil.com" })
      
    ceoContactInfo.employee = ceo
    await this.contactInfoRepositry.save(ceoContactInfo)
    
    const manager = this.employeeRepositry.create({
      firstName: "gbolahan",
      manager: ceo,
    })

    const task1 = this.taskRepositry.create({ name: "Hire people" })
    await this.taskRepositry.save(task1)
    const task2 = this.taskRepositry.create({ name: "Present to CEO" })
    await this.taskRepositry.save(task2)

    const meeting1 = this.meetingRepositry.create({ zoomUrl: "meeting.com" })
    meeting1.attendees = [ceo]
    await this.meetingRepositry.save(meeting1)

    manager.task = [task1, task2]
    await this.employeeRepositry.save(manager)
  }

  create(createEmployeeDto: CreateEmployeeDto) {
    const newUser = this.employeeRepositry.create(createEmployeeDto)

    return this.employeeRepositry.save(newUser);
  }

  findAll() {
    return this.employeeRepositry.find();
  }

  findOne(id: number) {
    return this.employeeRepositry.findOneByOrFail({id});
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const user = await this.findOne(id)
    return this.employeeRepositry.save({...user, ...updateEmployeeDto}) ;
  }

  async remove(id: number) {
     const user = await this.findOne(id)
    return this.employeeRepositry.delete(user);
  }
}
