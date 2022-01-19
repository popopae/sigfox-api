export interface CreateDeviceRequest {
  id?: string;
  name?: string;
  activable?: boolean;
  automaticRenewal?: boolean;
  lat?: string;
  lng?: string;
  productCertificate?: ProductCertificate;
  prototype?: boolean;
  pac?: string;
  deviceTypeId?: string;
}

export interface ProductCertificate {
  key?: string;
}
