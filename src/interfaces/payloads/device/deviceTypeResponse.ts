export interface DeviceTypeResponse {
  data?: Data[];
  actions?: string[];
  paging?: Paging;
}

export interface Data {
  name?: number;
  description?: string;
  downlinkMode?: number;
  downlinkDataString?: string;
  payloadType?: number;
  payloadConfig?: string;
  keepAlive?: number;
  alertEmail?: string;
  automaticRenewal?: boolean;
  id?: string;

  group?: Group;
  contract?: Contract;
  contracts?: Contract[];
  detachedContracts?: Contract[];
  geolocPayloadConfig?: GeolocPayloadConfig;

  creationTime?: number;
  createdBy: string;
  lastEditionTime: number;
  lastEditedBy: string;
}

export interface Contract {
  id?: string;
  name?: string;
  actions?: string[];
  resources?: string[];
}

export interface Group {
  id?: string;
  name?: string;
  type?: number;
  level?: number;
  actions?: string[];
}

export interface GeolocPayloadConfig {
  id?: string;
  name?: string;
}

export interface Paging {
  next?: string;
}
