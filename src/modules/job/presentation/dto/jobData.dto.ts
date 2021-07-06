import { IsString, IsNumber, Max, Min } from 'class-validator';

class JobDataDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  @Min(500)
  readonly salary: number;

  @IsNumber()
  @Min(4)
  @Max(20)
  readonly workingHours: number;
}

export default JobDataDto;
