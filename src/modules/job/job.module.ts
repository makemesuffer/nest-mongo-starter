import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmployeeModule } from '../employee/employee.module';
import { HiringModule } from '../hiring/hiring.module';
import { JobSchema } from './models/job.model';
import { JobController } from './presentation/controllers/job.controller';
import { JobService } from './services/job.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }], 'nimbusDB'),
    EmployeeModule,
    HiringModule,
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [
    MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }], 'nimbusDB'),
  ],
})
export class JobModule {}
