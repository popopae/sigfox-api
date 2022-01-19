import { IsString, IsBoolean, IsNumber, IsObject } from 'class-validator';
import { ProductCertificate } from './productCertificate.dto';

export class CreateDeviceDto {
  @IsString()
  public id: string;

  @IsString()
  public name: string;

  @IsBoolean()
  public activable: boolean;

  @IsBoolean()
  public automaticRenewal: boolean;

  @IsNumber()
  public lat: number;

  @IsNumber()
  public lng?: number;

  @IsObject()
  public productCertificate: ProductCertificate;

  @IsBoolean()
  public prototype: boolean;

  @IsString()
  public pac: string;

  @IsString()
  public deviceTypeId: string;
}
