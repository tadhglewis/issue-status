import type { ComponentType } from "../api/types";
import { useTranslation } from "react-i18next";

export const Badge = ({ status }: { status: ComponentType["status"] }) => {
  const { t } = useTranslation();
  const statusClasses: Record<ComponentType["status"], string> = {
    operational: "text-green-800 bg-green-100 dark:text-green-200 dark:bg-green-900",
    degradedPerformance: "text-amber-800 bg-amber-100 dark:text-amber-200 dark:bg-amber-900",
    partialOutage: "text-red-800 bg-red-100 dark:text-red-200 dark:bg-red-900",
    majorOutage: "text-red-900 bg-red-200 dark:text-red-100 dark:bg-red-800",
    unknown: "text-gray-800 bg-gray-100 dark:text-gray-200 dark:bg-gray-800",
  };

  const statusText: Record<ComponentType["status"], string> = {
    operational: t("operational"),
    degradedPerformance: t("degraded_performance"),
    partialOutage: t("partial_outage"),
    majorOutage: t("major_outage"),
    unknown: t("unknown"),
  };

  const badgeClasses = `
    px-3 py-1 rounded-full text-xs font-semibold
    ${statusClasses[status]}
  `;

  return <div className={badgeClasses}>{statusText[status]}</div>;
};
