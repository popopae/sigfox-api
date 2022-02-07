import { IsNotEmpty, IsString } from 'class-validator';

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
}
