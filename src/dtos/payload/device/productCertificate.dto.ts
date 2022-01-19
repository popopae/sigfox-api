import { IsString } from 'class-validator';

export class ProductCertificate {
  @IsString()
  public key: string;
}
