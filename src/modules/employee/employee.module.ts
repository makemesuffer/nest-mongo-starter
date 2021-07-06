import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HiringModule } from '../hiring/hiring.module';
import { JobModule } from '../job/job.module';
import { EmployeeSchema } from './models/employee.model';
import { EmployeeController } from './presentation/controllers/employee.controller';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Employee', schema: EmployeeSchema }],
      'nimbusDB',
    ),
    HiringModule,
    forwardRef(() => JobModule),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [
    MongooseModule.forFeature(
      [{ name: 'Employee', schema: EmployeeSchema }],
      'nimbusDB',
    ),
  ],
})
export class EmployeeModule {}
