import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UplinkDto {
  @IsNotEmpty()
  @IsString()
  public deviceTypeId: string;

  @IsNotEmpty()
  @IsString()
  public deviceId: string;

  @IsNotEmpty()
  @IsString()
  public data: string;

  @IsNotEmpty()
  @IsNumber()
  public time: number;
}
