import { Schema, Document } from 'mongoose';

import { Employee } from '../../employee/models/employee.model';
import { Job } from '../../job/models/job.model';

export const HiringSchema: Schema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job' },
  startDate: { type: Date, required: true },
});

export interface Hiring extends Document {
  employeeId: Employee['_id'];
  jobId: Job['_id'];
  startDate: Date;
}
