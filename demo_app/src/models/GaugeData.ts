export interface GaugeStdRange {
  mean: number;
  std: number;
}

export interface GaugeMinMaxRange {
  min: number;
  max: number;
}

export interface GaugeData {
  title: string;
  description?: string;
  rangeMinMax?: GaugeMinMaxRange;
  rangeStd?: GaugeStdRange;
}

export interface GaugeScore {
  value: number;
  outlier?: boolean;
}