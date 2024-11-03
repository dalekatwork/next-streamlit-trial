import React from "react";

interface OptimizationData {
  severity: string;
  name: string;
  actionables: number;
  savingPotential: number;
  labels: {
    actionables: string;
    savingPotential: string;
  };
}

interface OptimizationCardProps {
  data: OptimizationData;
}

const OptimizationCard: React.FC<OptimizationCardProps> = ({ data }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-rose-500";
      case "medium":
        return "bg-blue-500";
      case "low":
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-[#1a1d24] rounded-[0.2rem] p-6">
      <div className="space-y-6">
        <div className="space-y-3">
          <span
            className={`${getSeverityColor(data.severity)} text-[11px] px-2 py-0.5 rounded-[0.2rem] inline-block`}
          >
            {data.severity}
          </span>
          <h3 className="text-white text-base font-normal">{data.name}</h3>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-1">
              {data.labels.actionables}
            </p>
            <p className="text-white text-2xl font-normal">
              {data.actionables}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">
              {data.labels.savingPotential}
            </p>
            <p className="text-white text-2xl font-normal">
              ${data.savingPotential.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationCard;
