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

import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Job } from 'src/modules/job/models/job.model';
import { EmployeeDataDto } from '../dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllEmployees(): Promise<Employee[]> {
    try {
      return await this.employeeService.getAllEmployees();
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createEmployee(
    @Body() employeeDataDto: EmployeeDataDto,
  ): Promise<Employee> {
    try {
      return await this.employeeService.createEmployee(employeeDataDto);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getEmployeeById(@Param('id') id: Employee['_id']): Promise<Employee> {
    try {
      return await this.employeeService.getEmployeeById(id);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateEmployee(
    @Body() employeeDataDto: EmployeeDataDto,
    @Param('id') id: Employee['_id'],
  ): Promise<Employee> {
    try {
      return await this.employeeService.updateEmployee(id, employeeDataDto);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteEmployee(
    @Param('id') id: Employee['_id'],
  ): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
    try {
      return await this.employeeService.deleteEmployee(id);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('/:id/jobs/:jobId/apply')
  @HttpCode(HttpStatus.OK)
  async applyForAJob(
    @Param('id') id: Employee['_id'],
    @Param('jobId') jobId: Job['_id'],
  ) {
    try {
      return await this.employeeService.applyForAJob(id, jobId);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('/:id/jobs/:jobId/leave')
  @HttpCode(HttpStatus.OK)
  async leaveJob(
    @Param('id') id: Employee['_id'],
    @Param('jobId') jobId: Job['_id'],
  ) {
    try {
      return await this.employeeService.leaveJob(id, jobId);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id/jobs')
  @HttpCode(HttpStatus.OK)
  async getAllJobs(@Param('id') id: Employee['_id']) {
    try {
      return await this.employeeService.getAllJobs(id);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id/salary')
  @HttpCode(HttpStatus.OK)
  async getSalary(@Param('id') id: Employee['_id']) {
    try {
      return await this.employeeService.getSalary(id);
    } catch (err) {
      throw new HttpException(
        err.message,
        Number(err.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
