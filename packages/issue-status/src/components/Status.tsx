import { useData } from "../api/useData";
import type { ComponentType } from "../api/types";
import { Skeleton } from "./Skeleton";

const calculateOverallStatus = (
  components: ComponentType[]
): { message: string; color: string } => {
  const allComponents = components.flatMap((comp) =>
    comp.children ? [comp, ...comp.children] : [comp]
  );

  const statusCounts = allComponents.reduce((acc, component) => {
    acc[component.status] = (acc[component.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalComponents = allComponents.length;

  if (statusCounts.operational === totalComponents) {
    // overall = operational
    return {
      message: "All Systems Operational",
      color: "bg-green-600 dark:bg-green-700",
    };
  }
  if (statusCounts.majorOutage === totalComponents) {
    // overall = major
    return {
      message: "Major System Outage",
      color: "bg-red-600 dark:bg-red-700",
    };
  }
  if (statusCounts.partialOutage === totalComponents) {
    // overall = partial
    return {
      message: "Partial System Outage",
      color: "bg-red-500 dark:bg-red-600",
    };
  }
  if (statusCounts.majorOutage > 0) {
    // overall = partial
    return {
      message: "Partial System Outage",
      color: "bg-red-500 dark:bg-red-600",
    };
  }
  if (statusCounts.partialOutage > 0) {
    // overall = minor
    return {
      message: "Minor Service Outage",
      color: "bg-yellow-600 dark:bg-yellow-700",
    };
  }
  if (
    statusCounts.degradedPerformance ===
    totalComponents - (statusCounts.operational || 0)
  ) {
    // overall = degraded
    return {
      message: "Degraded System Performance",
      color: "bg-yellow-500 dark:bg-yellow-600",
    };
  }
  if (statusCounts.degradedPerformance > 0) {
    // overall = degraded
    return {
      message: "Partially Degraded Service",
      color: "bg-yellow-500 dark:bg-yellow-600",
    };
  }

  // overall = operational
  return {
    message: "All Systems Operational",
    color: "bg-green-600 dark:bg-green-700",
  };
};

export const Status = () => {
  const { components, loading } = useData();

  if (loading || !components) {
    return (
      <div className="p-4 rounded-xs mb-8">
        <Skeleton />
      </div>
    );
  }

  const { message, color } = calculateOverallStatus(components);

  return (
    <div
      className={`
        ${color}
        text-white
        p-4
        rounded-xs
        mb-8
        flex justify-between items-center flex-wrap
        transition-all duration-300
      `}
    >
      <h2 className="text-xl m-0 font-normal">{message}</h2>
    </div>
  );
};
