import { IsString, IsDate, MaxLength } from 'class-validator';

class EmployeeDataDto {
  @IsString()
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @MaxLength(50)
  readonly surname: string;

  @IsDate()
  readonly birthDate: Date;
}

export default EmployeeDataDto;
