export interface TableUsageData {
  table: string;
  workloads: number;
  queries: number;
  cost: number;
  success: number;
  failure: number;
}

export interface TableUsageLabels {
  columns: {
    table: string;
    workloads: string;
    queries: string;
    cost: string;
    success: string;
    failure: string;
  };
}

export interface TeamCostData {
  team: string;
  cost: number;
}

export interface TeamCostLabels {
  columns: {
    team: string;
    cost: string;
  };
}