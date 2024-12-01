export type CardVariant = "indigo" | "purple" | "teal" | "rose";

export type SeverityType = "Critical" | "Medium" | "Low";

export interface OverviewCardData {
  title: string;
  value: string | number;
  variant: CardVariant;
}

export interface OptimizationData {
  id: number;
  title: string;
  severity: SeverityType;
  actionables: number;
  savingPotential: number;
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

export interface DashboardLabels {
  overview: {
    warehouses: OverviewCardData;
    utilization: OverviewCardData;
    totalCost: OverviewCardData;
    savingPotential: OverviewCardData;
  };
  optimizations: {
    title: string;
    severity: Record<Lowercase<SeverityType>, {
      label: string;
      color: string;
    }>;
    metrics: {
      actionables: string;
      savingPotential: string;
    };
  };
  tables: {
    workloads: {
      title: string;
      columns: {
        workload: string;
        type: string;
        cost: string;
        successRate: string;
      };
      successLabel: string;
    };
    teams: {
      title: string;
      columns: {
        team: string;
        cost: string;
      };
    };
  };
}