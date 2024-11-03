import React from "react";

interface OverviewSection {
  id: string;
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  bgColor: string;
}

interface OverviewProps {
  data: {
    sections: OverviewSection[];
  };
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  const getBackgroundColor = (id: string) => {
    switch (id) {
      case "warehouses":
      case "totalQueries":
        return "bg-indigo-900";
      case "utilization":
      case "avgQueueTime":
        return "bg-purple-900";
      case "totalCost":
      case "failures":
        return "bg-teal-900";
      case "savingPotential":
        return "bg-rose-900";
      default:
        return "bg-gray-900";
    }
  };

  const formatValue = (section: OverviewSection) => {
    if (typeof section.value === "number") {
      const formatted = section.value.toLocaleString("en-US", {
        minimumFractionDigits: section.id === "utilization" ? 1 : 0,
        maximumFractionDigits: section.id === "utilization" ? 1 : 0,
        useGrouping: true,
      });
      return `${section.prefix || ""}${formatted}${section.suffix || ""}`;
    }
    return `${section.prefix || ""}${section.value}${section.suffix || ""}`;
  };

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {data.sections.map((section) => (
        <div
          key={section.id}
          className={`${getBackgroundColor(section.id)} p-6 rounded-[0.2rem]`}
        >
          <h3 className="text-gray-300 text-sm mb-2">{section.label}</h3>
          <p
            className="text-white text-2xl font-normal"
            suppressHydrationWarning
          >
            {formatValue(section)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Overview;
