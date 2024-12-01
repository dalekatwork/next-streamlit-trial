export type OptimizationAction = "raise";

export interface Optimization {
  pipeline: string;
  warehouse: string;
  action: OptimizationAction;
}

export interface OptimizationLabels {
  columns: {
    pipeline: string;
    warehouse: string;
    action: string;
  };
  actions: {
    raise: string;
  };
}

export interface OptimizationsData {
  visualizations: number;
  pipelines: number;
  items: Optimization[];
}