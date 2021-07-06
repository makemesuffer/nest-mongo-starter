import { Schema, Document, Types } from 'mongoose';

export const JobSchema: Schema = new Schema({
  title: { type: String, maxLength: 45, required: true, unique: true },
  salary: { type: Number, required: true },
  workingHours: { type: Number, required: true, max: 20 },
  employeeId: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
});

export interface Job extends Document {
  title: string;
  salary: number;
  workingHours: number;
  employeeId: Array<Types.ObjectId | Record<string, unknown>>;
}
