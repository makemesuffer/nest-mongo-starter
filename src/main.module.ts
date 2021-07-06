import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { JobModule } from './modules/job/job.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { HiringModule } from './modules/hiring/hiring.module';
import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'nimbusDB',
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('nimbusDB'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    JobModule,
    EmployeeModule,
    HiringModule,
  ],
})
export class MainModule {}
