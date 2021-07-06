import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Employee } from 'src/modules/employee/models/employee.model';

import { Job } from '../../models/job.model';
import { JobService } from '../../services/job.service';
import { JobDataDto } from '../dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllJobs(): Promise<Job[]> {
    try {
      return await this.jobService.getAllJobs();
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createJob(@Body() jobDataDto: JobDataDto): Promise<Job> {
    try {
      return await this.jobService.createJob(jobDataDto);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getJobById(@Param('id') id: Job['_id']): Promise<Job> {
    try {
      return await this.jobService.getJobById(id);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateJob(
    @Body() jobDataDto: JobDataDto,
    @Param('id') id: Job['_id'],
  ): Promise<Job> {
    try {
      return await this.jobService.updateJob(id, jobDataDto);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteJob(
    @Param('id') id: Job['_id'],
  ): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
    try {
      return await this.jobService.deleteJob(id);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/employees')
  @HttpCode(HttpStatus.OK)
  async getJobData(@Param('id') id: Job['_id']) {
    try {
      return await this.jobService.getJobData(id);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/salary')
  @HttpCode(HttpStatus.OK)
  async getAllJobSalary(@Param('id') id: Job['_id']) {
    try {
      return await this.jobService.getAllJobSalary(id);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id/salary/:employeeId')
  @HttpCode(HttpStatus.OK)
  async fireAnEmployee(
    @Param('id') id: Job['_id'],
    @Param('employeeId') employeeId: Employee['_id'],
  ) {
    try {
      return await this.jobService.fireAnEmployee(id, employeeId);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
