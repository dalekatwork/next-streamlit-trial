export type FailureAction = "fix" | "raise";

export interface FailureItem {
  source: string;
  reason: string;
  occurrences: number;
  type: string;
  cost: number;
  action: FailureAction;
}

export interface FailureLabels {
  columns: {
    source: string;
    reason: string;
    occurrences: string;
    type: string;
    cost: string;
    action: string;
  };
  actions: {
    fix: string;
    raise: string;
  };
}