export interface TableData {
  table: string;
  attachedWorkloads: number;
  queries: number;
  cost: number;
  success: number;
  failure: number;
}

export interface WorkloadData {
  workload: string;
  type: string;
  cost: number;
  success: number;
  failure: number;
}

export interface TeamData {
  team: string;
  cost: number;
}
