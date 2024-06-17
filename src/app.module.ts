import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourcesOptions } from 'db/data-source';


 
@Module({
  imports: [ TypeOrmModule.forRoot(dataSourcesOptions), EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
