export interface DecodeUplink {
  buffer?: number;
  messageType?: number;
  highCurrent?: string;
  lowCurrent?: string;
  highVoltage?: string;
  lowVoltage?: string;
  noLoad?: string;
  activePower?: number;
  activeEnergy?: number;
  current?: number;
  voltage?: number;
  powerFactor?: number;
  frequency?: number;
  controllerTemp?: number;
  lightStatus?: boolean;
  brightness?: number;
}
