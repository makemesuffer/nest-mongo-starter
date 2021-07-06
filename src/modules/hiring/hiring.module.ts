import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HiringSchema } from './models/hiring.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Hiring', schema: HiringSchema }],
      'nimbusDB',
    ),
  ],
  exports: [
    MongooseModule.forFeature(
      [{ name: 'Hiring', schema: HiringSchema }],
      'nimbusDB',
    ),
  ],
})
export class HiringModule {}
