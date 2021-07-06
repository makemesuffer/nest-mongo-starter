import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Job } from '../models/job.model';
import { Hiring } from 'src/modules/hiring/models/hiring.model';
import { Employee } from 'src/modules/employee/models/employee.model';
import { JobDataDto } from '../presentation/dto';

@Injectable()
export class JobService {
  constructor(
    @InjectModel('Job') private readonly jobModel: Model<Job>,
    @InjectModel('Hiring') private readonly hiringModel: Model<Hiring>,
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  async createJob(data: JobDataDto) {
    const job = new this.jobModel(data);
    return job.save();
  }

  async getAllJobs() {
    return this.jobModel.find({});
  }

  async getJobById(id: Job['_id']) {
    return this.jobModel.findById({ _id: id });
  }

  async updateJob(id: Job['_id'], body: JobDataDto) {
    await this.jobModel.findOneAndUpdate({ _id: id }, body);
    return this.jobModel.findById({ _id: id });
  }

  async deleteJob(id: Job['_id']) {
    return this.jobModel.deleteOne({ _id: id });
  }

  async getJobData(jobId: Job['_id']) {
    return this.hiringModel.find({ jobId }).populate('employeeId');
  }

  private async getAllEmployees(id: Job['_id']) {
    const job = await this.jobModel.findById({ _id: id });
    if (job) {
      return this.employeeModel.find({ _id: { $in: job.employeeId } });
    } else {
      throw new Error('Invalid job id');
    }
  }

  async getAllJobSalary(id: Job['_id']) {
    const employees = await this.getAllEmployees(id);
    const job = await this.getJobById(id);
    if (job) {
      const totalSalary = employees.length * job.salary;
      return { totalSalary };
    } else {
      throw new Error('Enter a valid job id');
    }
  }

  async fireAnEmployee(id: Job['_id'], employeeId: Employee['_id']) {
    await this.jobModel.findOneAndUpdate(
      { _id: id },
      { $pull: { employeeId } },
    );
    await this.hiringModel.deleteOne({ jobId: id, employeeId });
    await this.employeeModel.findOneAndUpdate(
      { _id: employeeId },
      { $pull: { jobId: id } },
    );
    return this.jobModel.findById({ _id: id });
  }
}
