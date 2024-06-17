import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ContactInfo } from './entities/contact-info.entity';
import { Meeting } from './entities/meeting.entity';
import { Task } from './entities/task.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Employee, ContactInfo, Meeting, Task])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
