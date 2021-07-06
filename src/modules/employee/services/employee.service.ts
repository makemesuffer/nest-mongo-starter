import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Employee } from '../models/employee.model';
import { Job } from 'src/modules/job/models/job.model';
import { Hiring } from 'src/modules/hiring/models/hiring.model';
import { EmployeeDataDto } from '../presentation/dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
    @InjectModel('Job') private readonly jobModel: Model<Job>,
    @InjectModel('Hiring') private readonly hiringModel: Model<Hiring>,
  ) {}

  async createEmployee(data: EmployeeDataDto) {
    const job = new this.employeeModel(data);
    return job.save();
  }

  async getAllEmployees() {
    return this.employeeModel.find({});
  }

  async getEmployeeById(id: Employee['_id']) {
    return this.employeeModel.findById({ _id: id });
  }

  async updateEmployee(id: Employee['_id'], body: EmployeeDataDto) {
    await this.employeeModel.findOneAndUpdate({ _id: id }, body);
    return this.employeeModel.findById({ _id: id });
  }

  async deleteEmployee(id: Employee['_id']) {
    return this.employeeModel.deleteOne({ _id: id });
  }

  private async getJobs(id: Employee['_id']) {
    const employee = await this.employeeModel.findById({ _id: id });
    if (employee) {
      return this.jobModel.find({ _id: { $in: employee.jobId } });
    } else {
      throw new Error('Invalid job id');
    }
  }

  private async apply(id: Employee['_id'], jobId: Job['_id']) {
    await this.employeeModel.findOneAndUpdate(
      { _id: id },
      { $push: { jobId } },
    );
    const applyDate = new Date();
    await this.jobModel.findOneAndUpdate(
      { _id: jobId },
      { $push: { employeeId: id } },
    );
    const hiring = new this.hiringModel({
      employeeId: id,
      jobId,
      startDate: applyDate,
    });
    await hiring.save();
    return this.employeeModel.findById({ _id: id });
  }

  async applyForAJob(id: Employee['_id'], jobId: Job['_id']) {
    const currentJobs = await this.getJobs(id);
    const totalWorkingHours = currentJobs.reduce(
      (a, b) => {
        return { workingHours: a.workingHours + b.workingHours };
      },
      { workingHours: 0 },
    );
    const jobToApply = await this.jobModel.findById({ _id: jobId });
    if (
      jobToApply &&
      jobToApply.workingHours + totalWorkingHours.workingHours > 20
    ) {
      return 'No more jobs for you, working bee';
    }
    return this.apply(id, jobId);
  }

  async leaveJob(id: Employee['_id'], jobId: Job['_id']) {
    await this.employeeModel.findOneAndUpdate(
      { _id: id },
      { $pull: { jobId } },
    );
    await this.jobModel.findOneAndUpdate(
      { _id: jobId },
      { $pull: { employeeId: id } },
    );
    await this.hiringModel.deleteOne({ employeeId: id, jobId });
    return this.employeeModel.findById({ _id: id });
  }

  async getAllJobs(id: Employee['_id']) {
    const employee = await this.hiringModel
      .find({ employeeId: id })
      .populate('jobId');
    return employee;
  }

  async getSalary(id: Employee['_id']) {
    const jobs = await this.getJobs(id);
    const totalSalary = jobs.reduce(
      (a, b) => {
        return { salary: a.salary + b.salary };
      },
      { salary: 0 },
    );
    return totalSalary;
  }
}
