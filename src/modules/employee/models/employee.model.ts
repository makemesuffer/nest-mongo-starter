import { Schema, Document, Types } from 'mongoose';

export const EmployeeSchema: Schema = new Schema({
  name: { type: String, maxLength: 45, required: true },
  surname: { type: String, maxLength: 45, required: true },
  birthDate: { type: Date, required: true },
  jobId: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
});

export interface Employee extends Document {
  name: string;
  surname: string;
  birthDate: Date;
  jobId: Array<Types.ObjectId | Record<string, unknown>>;
}
