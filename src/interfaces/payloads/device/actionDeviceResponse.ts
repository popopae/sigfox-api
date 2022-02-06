export interface ActionDeviceResponse {
  message?: string;
  errors?: Errors[];
}

export interface Errors {
  type?: string;
  field?: string;
  message?: string;
}
