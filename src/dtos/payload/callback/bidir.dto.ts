import { IsNotEmpty, IsString } from 'class-validator';

export class BidirDto {
  @IsNotEmpty()
  @IsString()
  public deviceId: string;

  @IsNotEmpty()
  @IsString()
  public data: string;
}
