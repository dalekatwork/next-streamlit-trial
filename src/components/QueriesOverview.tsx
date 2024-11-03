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

const QueriesOverview: React.FC<OverviewProps> = ({ data }) => {
  const getBackgroundColor = (id: string) => {
    switch (id) {
      case "totalQueries":
        return "bg-indigo-900";
      case "avgQueueTime":
        return "bg-purple-900";
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
        maximumFractionDigits: 0,
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
          className={`${getBackgroundColor(section.id)} p-6 rounded-lg`}
        >
          <h3 className="text-gray-300 text-sm mb-2">{section.label}</h3>
          <p className="text-white text-2xl font-normal">
            {formatValue(section)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QueriesOverview;
