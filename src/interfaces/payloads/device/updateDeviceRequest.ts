export interface UpdateDeviceRequest {
  activable?: boolean;
  automaticRenewal?: boolean;
  lat?: string;
  lng?: string;
  productCertificate?: ProductCertificate;
  prototype?: boolean;
  name?: string;
}

export interface ProductCertificate {
  key?: string;
}
