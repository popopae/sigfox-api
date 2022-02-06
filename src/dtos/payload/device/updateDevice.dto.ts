import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { ProductCertificate } from './productCertificate.dto';

export class UpdateDeviceDto {
  @IsBoolean()
  public activable: boolean;

  @IsBoolean()
  public automaticRenewal: boolean;

  @IsNumber()
  public lat: number;

  @IsNumber()
  public lng: number;

  @IsObject()
  public productCertificate: ProductCertificate;

  @IsBoolean()
  public prototype: boolean;

  @IsString()
  public name: string;
}
