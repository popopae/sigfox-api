import { IsNotEmpty } from 'class-validator';

export class UplinkDto {
  @IsNotEmpty()
  public deviceTypeId: string;

  @IsNotEmpty()
  public deviceId: string;

  @IsNotEmpty()
  public data: string;
}
